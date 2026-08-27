import { handleAppPreflight, isAllowedAppOrigin } from "./_lib/cors.js";

const WEATHER_CODES = Object.freeze({
  0: "cielo despejado",
  1: "principalmente despejado",
  2: "parcialmente nublado",
  3: "nublado",
  45: "niebla",
  48: "niebla con escarcha",
  51: "llovizna ligera",
  53: "llovizna moderada",
  55: "llovizna intensa",
  56: "llovizna helada ligera",
  57: "llovizna helada intensa",
  61: "lluvia ligera",
  63: "lluvia moderada",
  65: "lluvia intensa",
  66: "lluvia helada ligera",
  67: "lluvia helada intensa",
  71: "nieve ligera",
  73: "nieve moderada",
  75: "nieve intensa",
  77: "granos de nieve",
  80: "chubascos ligeros",
  81: "chubascos moderados",
  82: "chubascos intensos",
  85: "chubascos de nieve ligeros",
  86: "chubascos de nieve intensos",
  95: "tormenta eléctrica",
  96: "tormenta con granizo ligero",
  99: "tormenta con granizo fuerte"
});

const COURSE_PLACE_FALLBACKS = Object.freeze([
  { match: /pult[eé]|country club|san isidro/i, place: "Guatemala City, Guatemala" },
  { match: /mayan golf/i, place: "Villa Nueva, Guatemala" },
  { match: /alta vista|hacienda nueva/i, place: "San José Pinula, Guatemala" },
  { match: /reuni[oó]n/i, place: "Alotenango, Guatemala" }
]);

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

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Weather upstream ${response.status}`);
  return response.json();
}

async function resolvePlace(location) {
  const query = String(location || "").trim().slice(0, 120);
  if (!query) return null;
  const fallback = COURSE_PLACE_FALLBACKS.find(item => item.match.test(query));
  const candidates = fallback ? [query, fallback.place] : [query];
  let match = null;
  for (const candidate of candidates) {
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name", candidate);
    url.searchParams.set("count", "1");
    url.searchParams.set("language", "es");
    url.searchParams.set("format", "json");
    const payload = await fetchJson(url);
    match = payload?.results?.[0] || null;
    if (match) break;
  }
  if (!match) return null;
  return {
    latitude: numberInRange(match.latitude, -90, 90),
    longitude: numberInRange(match.longitude, -180, 180),
    label: fallback ? query : [match.name, match.admin1, match.country].filter(Boolean).join(", ")
  };
}

function summarizeRainTiming(payload, date, notBefore = "", notAfter = "") {
  const hourly = payload?.hourly || {};
  const times = Array.isArray(hourly.time) ? hourly.time.map(String) : [];
  const probabilities = Array.isArray(hourly.precipitation_probability) ? hourly.precipitation_probability : [];
  const precipitation = Array.isArray(hourly.precipitation) ? hourly.precipitation : [];
  const records = times.map((time, index) => ({
    isoTime: time,
    time: time.slice(11, 16),
    probability: Number.isFinite(Number(probabilities[index])) ? Number(probabilities[index]) : null,
    precipitationMm: Number.isFinite(Number(precipitation[index])) ? Number(precipitation[index]) : null
  })).filter(item => item.isoTime.slice(0, 10) === date && (!notBefore || item.isoTime >= notBefore) && (!notAfter || item.isoTime <= notAfter) && item.probability != null);
  if (!records.length) return null;
  const peak = records.reduce((best, item) => item.probability > best.probability ? item : best, records[0]);
  let likely = records.filter(item => item.probability >= 30 || Number(item.precipitationMm) > 0);
  if (!likely.length && peak.probability > 0) likely = [peak];
  const windows = [];
  for (const item of likely) {
    const previous = windows.at(-1);
    const previousMs = previous ? Date.parse(previous.lastIsoTime) : NaN;
    const itemMs = Date.parse(item.isoTime);
    if (!previous || !Number.isFinite(previousMs) || !Number.isFinite(itemMs) || itemMs - previousMs > 61 * 60 * 1000) {
      windows.push({
        startTime: item.time,
        endTime: item.time,
        maxProbability: item.probability,
        peakTime: item.time,
        precipitationMm: Number(item.precipitationMm) || 0,
        lastIsoTime: item.isoTime
      });
      continue;
    }
    previous.endTime = item.time;
    previous.lastIsoTime = item.isoTime;
    previous.precipitationMm = Number((previous.precipitationMm + (Number(item.precipitationMm) || 0)).toFixed(1));
    if (item.probability > previous.maxProbability) {
      previous.maxProbability = item.probability;
      previous.peakTime = item.time;
    }
  }
  return {
    date,
    peakProbability: peak.probability,
    peakTime: peak.time,
    windows: windows.map(({ lastIsoTime, ...window }) => window)
  };
}

function hourlyForecastForDate(payload, date, notBefore = "", notAfter = "") {
  const hourly = payload?.hourly || {};
  const times = Array.isArray(hourly.time) ? hourly.time.map(String) : [];
  return times.map((isoTime, index) => ({
    isoTime,
    time: isoTime.slice(11, 16),
    rainProbability: Number.isFinite(Number(hourly.precipitation_probability?.[index])) ? Number(hourly.precipitation_probability[index]) : null,
    precipitationMm: Number.isFinite(Number(hourly.precipitation?.[index])) ? Number(hourly.precipitation[index]) : null,
    temperatureC: Number.isFinite(Number(hourly.temperature_2m?.[index])) ? Number(hourly.temperature_2m[index]) : null,
    feelsLikeC: Number.isFinite(Number(hourly.apparent_temperature?.[index])) ? Number(hourly.apparent_temperature[index]) : null,
    windKmh: Number.isFinite(Number(hourly.wind_speed_10m?.[index])) ? Number(hourly.wind_speed_10m[index]) : null,
    condition: WEATHER_CODES[Number(hourly.weather_code?.[index])] || null
  })).filter(item => item.isoTime.slice(0, 10) === date && (!notBefore || item.isoTime >= notBefore) && (!notAfter || item.isoTime <= notAfter))
    .map(({ isoTime, ...item }) => item);
}

function summarizeHourlyPeriod(payload, date, periodKey) {
  const period = FORECAST_PERIODS[periodKey];
  if (!period) return null;
  const hourly = payload?.hourly || {};
  const times = Array.isArray(hourly.time) ? hourly.time.map(String) : [];
  const rows = times.map((time, index) => ({
    time,
    temperatureC: Number(hourly.temperature_2m?.[index]),
    feelsLikeC: Number(hourly.apparent_temperature?.[index]),
    weatherCode: Number(hourly.weather_code?.[index]),
    windKmh: Number(hourly.wind_speed_10m?.[index]),
    rainProbability: Number(hourly.precipitation_probability?.[index]),
    precipitationMm: Number(hourly.precipitation?.[index])
  })).filter(row => {
    const hour = Number(row.time.slice(11, 13));
    return row.time.slice(0, 10) === date && hour >= period.startHour && hour <= period.endHour;
  });
  if (!rows.length) return null;
  const finite = (key) => rows.map(row => row[key]).filter(Number.isFinite);
  const temperatures = finite("temperatureC");
  const feels = finite("feelsLikeC");
  const winds = finite("windKmh");
  const probabilities = finite("rainProbability");
  const precipitation = finite("precipitationMm");
  const representative = [...rows].sort((a, b) => (Number.isFinite(b.rainProbability) ? b.rainProbability : -1) - (Number.isFinite(a.rainProbability) ? a.rainProbability : -1))[0];
  const startTime = `${String(period.startHour).padStart(2, "0")}:00`;
  const endTime = `${String(period.endHour).padStart(2, "0")}:59`;
  return {
    forecastPeriod: periodKey,
    periodLabel: period.label,
    periodStartTime: startTime,
    periodEndTime: endTime,
    condition: WEATHER_CODES[representative.weatherCode] || "condición no clasificada",
    temperatureMinC: temperatures.length ? Math.min(...temperatures) : null,
    temperatureMaxC: temperatures.length ? Math.max(...temperatures) : null,
    feelsLikeMinC: feels.length ? Math.min(...feels) : null,
    feelsLikeMaxC: feels.length ? Math.max(...feels) : null,
    precipitationMm: precipitation.length ? Number(precipitation.reduce((sum, value) => sum + value, 0).toFixed(1)) : null,
    maxRainProbability: probabilities.length ? Math.max(...probabilities) : null,
    windKmh: winds.length ? Math.max(...winds) : null,
    rainTiming: summarizeRainTiming(payload, date, `${date}T${startTime}`, `${date}T${String(period.endHour).padStart(2, "0")}:59`),
    hourlyForecast: hourlyForecastForDate(payload, date, `${date}T${startTime}`, `${date}T${String(period.endHour).padStart(2, "0")}:59`)
  };
}

export function summarizeWeather(payload, label, options = {}) {
  const forecastStartDate = String(options.forecastStartDate || "").trim();
  const forecastEndDate = String(options.forecastEndDate || forecastStartDate).trim();
  const timePeriod = FORECAST_PERIODS[options.timePeriod] ? String(options.timePeriod) : "";
  if (forecastStartDate) {
    const daily = payload?.daily || {};
    const dates = Array.isArray(daily.time) ? daily.time.map(String) : [];
    const startIndex = dates.indexOf(forecastStartDate);
    const endIndex = dates.indexOf(forecastEndDate);
    if (startIndex < 0 || endIndex < startIndex) {
      return {
        ok: false,
        error: "FORECAST_DATE_UNAVAILABLE",
        requestedStartDate: forecastStartDate,
        requestedEndDate: forecastEndDate,
        availableFrom: dates[0] || null,
        availableThrough: dates.at(-1) || null
      };
    }
    const valueAt = (key, index) => {
      const value = Array.isArray(daily[key]) ? Number(daily[key][index]) : NaN;
      return Number.isFinite(value) ? value : null;
    };
    const days = dates.slice(startIndex, endIndex + 1).map((date, offset) => {
      const index = startIndex + offset;
      const dailySummary = {
        date,
        condition: WEATHER_CODES[valueAt("weather_code", index)] || "condición no clasificada",
        temperatureMinC: valueAt("temperature_2m_min", index),
        temperatureMaxC: valueAt("temperature_2m_max", index),
        feelsLikeMinC: valueAt("apparent_temperature_min", index),
        feelsLikeMaxC: valueAt("apparent_temperature_max", index),
        precipitationMm: valueAt("precipitation_sum", index),
        maxRainProbability: valueAt("precipitation_probability_max", index),
        windKmh: valueAt("wind_speed_10m_max", index),
        rainTiming: summarizeRainTiming(payload, date),
        ...(forecastStartDate === forecastEndDate ? { hourlyForecast: hourlyForecastForDate(payload, date) } : {})
      };
      const periodSummary = summarizeHourlyPeriod(payload, date, timePeriod);
      return periodSummary ? { date, ...periodSummary } : dailySummary;
    });
    return {
      ok: true,
      source: "Open-Meteo",
      location: label,
      timezone: payload?.timezone || null,
      forecastType: days.length > 1 ? "range" : "day",
      forecastStartDate,
      forecastEndDate,
      ...(days.length === 1 ? days[0] : { days })
    };
  }
  const current = payload?.current || {};
  const times = Array.isArray(payload?.hourly?.time) ? payload.hourly.time : [];
  const probabilities = Array.isArray(payload?.hourly?.precipitation_probability)
    ? payload.hourly.precipitation_probability
    : [];
  const now = Date.parse(current.time || "");
  const remaining = probabilities.filter((value, index) => {
    const time = Date.parse(times[index] || "");
    return Number.isFinite(Number(value)) && (!Number.isFinite(now) || time >= now);
  }).map(Number);
  const maxRainProbability = remaining.length ? Math.max(...remaining) : null;
  const observedDate = String(current.time || "").slice(0, 10);
  return {
    ok: true,
    source: "Open-Meteo",
    location: label,
    observedAt: current.time || null,
    timezone: payload?.timezone || null,
    temperatureC: Number.isFinite(Number(current.temperature_2m)) ? Number(current.temperature_2m) : null,
    feelsLikeC: Number.isFinite(Number(current.apparent_temperature)) ? Number(current.apparent_temperature) : null,
    precipitationMm: Number.isFinite(Number(current.precipitation)) ? Number(current.precipitation) : null,
    windKmh: Number.isFinite(Number(current.wind_speed_10m)) ? Number(current.wind_speed_10m) : null,
    condition: WEATHER_CODES[Number(current.weather_code)] || "condición no clasificada",
    maxRainProbabilityToday: maxRainProbability,
    rainTiming: observedDate ? summarizeRainTiming(payload, observedDate, current.time || "") : null
  };
}

export async function computeWeatherForecast(body = {}) {
  let latitude = numberInRange(body.latitude, -90, 90);
  let longitude = numberInRange(body.longitude, -180, 180);
  let label = String(body.location || "").trim().slice(0, 120) || "ubicación actual";
  if (latitude == null || longitude == null) {
    const place = await resolvePlace(body.location);
    if (!place || place.latitude == null || place.longitude == null) {
      return { ok: false, needsLocation: true, error: "LOCATION_REQUIRED" };
    }
    ({ latitude, longitude, label } = place);
  }
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const rawForecastStartDate = String(body.forecastStartDate || body.forecastDate || "").trim();
  const rawForecastEndDate = String(body.forecastEndDate || rawForecastStartDate).trim();
  const timePeriod = String(body.timePeriod || "").trim().toLowerCase();
  if ((rawForecastStartDate && !datePattern.test(rawForecastStartDate)) ||
      (rawForecastEndDate && !datePattern.test(rawForecastEndDate)) ||
      (rawForecastStartDate && rawForecastEndDate < rawForecastStartDate) ||
      (timePeriod && !FORECAST_PERIODS[timePeriod])) {
    return { ok: false, error: "INVALID_FORECAST_DATE" };
  }
  const wantsFutureForecast = Boolean(rawForecastStartDate);
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  if (wantsFutureForecast) {
    url.searchParams.set("daily", "weather_code,temperature_2m_min,temperature_2m_max,apparent_temperature_min,apparent_temperature_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max");
    url.searchParams.set("hourly", "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation_probability,precipitation");
    url.searchParams.set("forecast_days", "16");
  } else {
    url.searchParams.set("current", "temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m");
    url.searchParams.set("hourly", "precipitation_probability,precipitation");
    url.searchParams.set("forecast_days", "1");
  }
  url.searchParams.set("timezone", "auto");
  const payload = await fetchJson(url);
  return summarizeWeather(payload, label, {
    forecastStartDate: rawForecastStartDate,
    forecastEndDate: rawForecastEndDate,
    timePeriod
  });
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
    return res.status(summary.ok ? 200 : 422).json(summary);
  } catch (error) {
    console.error("weather", error instanceof Error ? error.message : String(error));
    return res.status(502).json({ ok: false, error: "WEATHER_UNAVAILABLE" });
  }
}
