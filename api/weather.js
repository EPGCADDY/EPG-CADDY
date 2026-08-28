import { handleAppPreflight, isAllowedAppOrigin } from "./_lib/cors.js";

const GOOGLE_WEATHER_BASE = "https://weather.googleapis.com/v1";
const GOOGLE_GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const FORECAST_PERIODS = Object.freeze({
  morning: { label: "mañana", startHour: 6, endHour: 11 },
  afternoon: { label: "tarde", startHour: 12, endHour: 17 },
  evening: { label: "atardecer", startHour: 18, endHour: 21 },
  night: { label: "noche", startHour: 22, endHour: 23 }
});

function numberInRange(value, min, max) {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max ? number : null;
}

function finite(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function weatherApiKey() {
  return String(process.env.GOOGLE_MAPS_WEATHER_API_KEY || process.env.GOOGLE_MAPS_API_KEY || "").trim();
}

function geocodingApiKey() {
  return String(process.env.GOOGLE_MAPS_GEOCODING_API_KEY || process.env.GOOGLE_MAPS_API_KEY || "").trim();
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Google weather upstream ${response.status}`);
  return response.json();
}

async function resolvePlace(location) {
  const query = String(location || "").trim().slice(0, 120);
  const key = geocodingApiKey();
  if (!query || !key) return null;
  const url = new URL(GOOGLE_GEOCODING_URL);
  url.searchParams.set("address", query);
  url.searchParams.set("region", "gt");
  url.searchParams.set("language", "es-419");
  url.searchParams.set("key", key);
  const payload = await fetchJson(url);
  const match = payload?.results?.[0];
  const latitude = numberInRange(match?.geometry?.location?.lat, -90, 90);
  const longitude = numberInRange(match?.geometry?.location?.lng, -180, 180);
  if (latitude == null || longitude == null) return null;
  return { latitude, longitude, label: String(match.formatted_address || query).slice(0, 120) };
}

function googleUrl(path, latitude, longitude, extras = {}) {
  const url = new URL(`${GOOGLE_WEATHER_BASE}/${path}`);
  url.searchParams.set("key", weatherApiKey());
  url.searchParams.set("location.latitude", String(latitude));
  url.searchParams.set("location.longitude", String(longitude));
  url.searchParams.set("unitsSystem", "METRIC");
  url.searchParams.set("languageCode", "es-419");
  for (const [key, value] of Object.entries(extras)) if (value != null && value !== "") url.searchParams.set(key, String(value));
  return url;
}

function dateKey(value) {
  const year = finite(value?.year), month = finite(value?.month), day = finite(value?.day);
  if (year == null || month == null || day == null) return "";
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function hourKey(value) {
  const hour = finite(value?.hours ?? value?.hour);
  const minute = finite(value?.minutes ?? value?.minute) ?? 0;
  return hour == null ? "" : `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function condition(value) {
  return String(value?.description?.text || value?.type || "condición no clasificada").trim().toLowerCase();
}

function temperature(value) {
  return finite(value?.degrees);
}

function windSpeed(value) {
  return finite(value?.speed?.value);
}

function rainProbability(value) {
  return finite(value?.probability?.percent);
}

function rainAmount(value) {
  return finite(value?.qpf?.quantity);
}

function normalizeHourly(payload) {
  return (Array.isArray(payload?.forecastHours) ? payload.forecastHours : []).map(row => ({
    date: dateKey(row.displayDateTime),
    time: hourKey(row.displayDateTime),
    rainProbability: rainProbability(row.precipitation),
    precipitationMm: rainAmount(row.precipitation),
    temperatureC: temperature(row.temperature),
    feelsLikeC: temperature(row.feelsLikeTemperature),
    windKmh: windSpeed(row.wind),
    condition: condition(row.weatherCondition)
  })).filter(row => row.date && row.time);
}

async function hourlyThrough(latitude, longitude, throughDate) {
  const rows = [];
  let pageToken = "";
  for (let page = 0; page < 10; page += 1) {
    const payload = await fetchJson(googleUrl("forecast/hours:lookup", latitude, longitude, {
      hours: 240,
      pageSize: 24,
      pageToken
    }));
    rows.push(...normalizeHourly(payload));
    if (!payload?.nextPageToken || rows.some(row => row.date >= throughDate)) break;
    pageToken = payload.nextPageToken;
  }
  return rows;
}

function summarizeRainTiming(rows, date) {
  const records = rows.filter(row => row.date === date && row.rainProbability != null);
  if (!records.length) return null;
  const peak = records.reduce((best, row) => row.rainProbability > best.rainProbability ? row : best, records[0]);
  const likely = records.filter(row => row.rainProbability >= 30 || Number(row.precipitationMm) > 0);
  const selected = likely.length ? likely : (peak.rainProbability > 0 ? [peak] : []);
  const windows = [];
  for (const row of selected) {
    const previous = windows.at(-1);
    const hour = Number(row.time.slice(0, 2));
    if (!previous || hour - previous.lastHour > 1) {
      windows.push({ startTime: row.time, endTime: row.time, maxProbability: row.rainProbability, peakTime: row.time, precipitationMm: row.precipitationMm || 0, lastHour: hour });
    } else {
      previous.endTime = row.time;
      previous.lastHour = hour;
      previous.precipitationMm = Number((previous.precipitationMm + (row.precipitationMm || 0)).toFixed(1));
      if (row.rainProbability > previous.maxProbability) {
        previous.maxProbability = row.rainProbability;
        previous.peakTime = row.time;
      }
    }
  }
  return {
    date,
    peakProbability: peak.rainProbability,
    peakTime: peak.time,
    windows: windows.map(({ lastHour, ...window }) => window)
  };
}

function normalizedDaily(row, hourlyRows, timePeriod = "") {
  const date = dateKey(row?.displayDate);
  const day = row?.daytimeForecast || {};
  const night = row?.nighttimeForecast || {};
  let hours = hourlyRows.filter(item => item.date === date);
  const period = FORECAST_PERIODS[timePeriod];
  if (period) hours = hours.filter(item => {
    const hour = Number(item.time.slice(0, 2));
    return hour >= period.startHour && hour <= period.endHour;
  });
  const values = (key) => hours.map(item => finite(item[key])).filter(value => value != null);
  const temperatures = values("temperatureC");
  const feels = values("feelsLikeC");
  const winds = values("windKmh");
  const rain = values("rainProbability");
  const precipitation = values("precipitationMm");
  const representative = [...hours].sort((a, b) => (b.rainProbability ?? -1) - (a.rainProbability ?? -1))[0];
  const dailyPrecipitation = [rainAmount(day.precipitation), rainAmount(night.precipitation)].filter(value => value != null);
  const dailyProbability = [rainProbability(day.precipitation), rainProbability(night.precipitation)].filter(value => value != null);
  const dailyWind = [windSpeed(day.wind), windSpeed(night.wind)].filter(value => value != null);
  return {
    date,
    ...(period ? {
      forecastPeriod: timePeriod,
      periodLabel: period.label,
      periodStartTime: `${String(period.startHour).padStart(2, "0")}:00`,
      periodEndTime: `${String(period.endHour).padStart(2, "0")}:59`
    } : {}),
    condition: representative?.condition || condition(day.weatherCondition),
    temperatureMinC: temperatures.length ? Math.min(...temperatures) : temperature(row?.minTemperature),
    temperatureMaxC: temperatures.length ? Math.max(...temperatures) : temperature(row?.maxTemperature),
    feelsLikeMinC: feels.length ? Math.min(...feels) : temperature(row?.feelsLikeMinTemperature),
    feelsLikeMaxC: feels.length ? Math.max(...feels) : temperature(row?.feelsLikeMaxTemperature),
    precipitationMm: precipitation.length ? Number(precipitation.reduce((sum, value) => sum + value, 0).toFixed(1)) : (dailyPrecipitation.length ? Number(dailyPrecipitation.reduce((sum, value) => sum + value, 0).toFixed(1)) : null),
    maxRainProbability: rain.length ? Math.max(...rain) : (dailyProbability.length ? Math.max(...dailyProbability) : null),
    windKmh: winds.length ? Math.max(...winds) : (dailyWind.length ? Math.max(...dailyWind) : null),
    rainTiming: summarizeRainTiming(hours, date),
    hourlyForecast: hours.map(({ date: ignored, ...item }) => item)
  };
}

export function summarizeWeather(payload, label, options = {}) {
  const hourlyRows = Array.isArray(options.hourlyRows) ? options.hourlyRows : [];
  const startDate = String(options.forecastStartDate || "").trim();
  const endDate = String(options.forecastEndDate || startDate).trim();
  if (startDate) {
    const allDays = Array.isArray(payload?.forecastDays) ? payload.forecastDays : [];
    const chosen = allDays.filter(row => {
      const date = dateKey(row.displayDate);
      return date >= startDate && date <= endDate;
    });
    if (!chosen.length) return {
      ok: false,
      error: "FORECAST_DATE_UNAVAILABLE",
      requestedStartDate: startDate,
      requestedEndDate: endDate,
      availableFrom: dateKey(allDays[0]?.displayDate) || null,
      availableThrough: dateKey(allDays.at(-1)?.displayDate) || null
    };
    const days = chosen.map(row => normalizedDaily(row, hourlyRows, options.timePeriod));
    return {
      ok: true,
      source: "Google Weather API",
      providerUpdatedAt: new Date().toISOString(),
      location: label,
      timezone: payload?.timeZone?.id || null,
      forecastType: days.length > 1 ? "range" : "day",
      forecastStartDate: startDate,
      forecastEndDate: endDate,
      ...(days.length === 1 ? days[0] : { days })
    };
  }
  const current = payload || {};
  const today = hourlyRows[0]?.date || "";
  const remaining = hourlyRows.map(row => row.rainProbability).filter(value => value != null);
  return {
    ok: true,
    source: "Google Weather API",
    providerUpdatedAt: new Date().toISOString(),
    location: label,
    observedAt: current.currentTime || null,
    timezone: current?.timeZone?.id || null,
    temperatureC: temperature(current.temperature),
    feelsLikeC: temperature(current.feelsLikeTemperature),
    precipitationMm: rainAmount(current.precipitation),
    windKmh: windSpeed(current.wind),
    condition: condition(current.weatherCondition),
    maxRainProbabilityToday: remaining.length ? Math.max(...remaining) : rainProbability(current.precipitation),
    rainTiming: today ? summarizeRainTiming(hourlyRows, today) : null
  };
}

export async function computeWeatherForecast(body = {}) {
  if (!weatherApiKey()) return { ok: false, error: "WEATHER_NOT_CONFIGURED" };
  let latitude = numberInRange(body.latitude, -90, 90);
  let longitude = numberInRange(body.longitude, -180, 180);
  let label = String(body.location || "").trim().slice(0, 120) || "ubicación actual";
  if (latitude == null || longitude == null) {
    const place = await resolvePlace(body.location);
    if (!place) return { ok: false, needsLocation: true, error: "LOCATION_REQUIRED" };
    ({ latitude, longitude, label } = place);
  }
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const forecastStartDate = String(body.forecastStartDate || body.forecastDate || "").trim();
  const forecastEndDate = String(body.forecastEndDate || forecastStartDate).trim();
  const timePeriod = String(body.timePeriod || "").trim().toLowerCase();
  if ((forecastStartDate && !datePattern.test(forecastStartDate)) ||
      (forecastEndDate && !datePattern.test(forecastEndDate)) ||
      (forecastStartDate && forecastEndDate < forecastStartDate) ||
      (timePeriod && !FORECAST_PERIODS[timePeriod])) {
    return { ok: false, error: "INVALID_FORECAST_DATE" };
  }
  if (forecastStartDate) {
    const [daily, hourlyRows] = await Promise.all([
      fetchJson(googleUrl("forecast/days:lookup", latitude, longitude, { days: 10, pageSize: 10 })),
      hourlyThrough(latitude, longitude, forecastEndDate)
    ]);
    return summarizeWeather(daily, label, { forecastStartDate, forecastEndDate, timePeriod, hourlyRows });
  }
  const [current, hourly] = await Promise.all([
    fetchJson(googleUrl("currentConditions:lookup", latitude, longitude)),
    fetchJson(googleUrl("forecast/hours:lookup", latitude, longitude, { hours: 24, pageSize: 24 }))
  ]);
  return summarizeWeather(current, label, { hourlyRows: normalizeHourly(hourly) });
}

export default async function handler(req, res) {
  if (handleAppPreflight(req, res)) return;
  res.setHeader("Cache-Control", "no-store");
  if (!isAllowedAppOrigin(req)) return res.status(403).json({ ok: false, error: "ORIGIN_NOT_ALLOWED" });
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const summary = await computeWeatherForecast(body);
    const status = summary.ok ? 200 : (summary.error === "WEATHER_NOT_CONFIGURED" ? 503 : 422);
    return res.status(status).json(summary);
  } catch (error) {
    console.error("weather", error instanceof Error ? error.message : String(error));
    return res.status(502).json({ ok: false, error: "WEATHER_UNAVAILABLE" });
  }
}
