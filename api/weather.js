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

export function summarizeWeather(payload, label) {
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
    maxRainProbabilityToday: maxRainProbability
  };
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
    let latitude = numberInRange(body.latitude, -90, 90);
    let longitude = numberInRange(body.longitude, -180, 180);
    let label = String(body.location || "").trim().slice(0, 120) || "ubicación actual";
    if (latitude == null || longitude == null) {
      const place = await resolvePlace(body.location);
      if (!place || place.latitude == null || place.longitude == null) {
        return res.status(422).json({ ok: false, needsLocation: true, error: "LOCATION_REQUIRED" });
      }
      ({ latitude, longitude, label } = place);
    }
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("current", "temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m");
    url.searchParams.set("hourly", "precipitation_probability");
    url.searchParams.set("forecast_days", "1");
    url.searchParams.set("timezone", "auto");
    const payload = await fetchJson(url);
    return res.status(200).json(summarizeWeather(payload, label));
  } catch (error) {
    console.error("weather", error instanceof Error ? error.message : String(error));
    return res.status(502).json({ ok: false, error: "WEATHER_UNAVAILABLE" });
  }
}
