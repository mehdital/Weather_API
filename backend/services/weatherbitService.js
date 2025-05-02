import axios from 'axios';
import cache from '../utils/cache.js';

const BASE = 'https://api.weatherbit.io/v2.0';
const KEY = process.env.WEATHERBIT_API_KEY;
if (!KEY) console.warn('WEATHERBIT_API_KEY not defined.');

function buildUrl(endpoint, params) {
  const query = new URLSearchParams({ key: KEY, lang: 'fr', ...params }).toString();
  return `${BASE}/${endpoint}?${query}`;
}

export async function fetchCurrent(city) {
  const key = `current:${city.toLowerCase()}`;
  if (cache.has(key)) return cache.get(key);

  const url = buildUrl('current', { city });
  const { data } = await axios.get(url);
  if (!data || data.count === 0) throw { status: 404, message: 'Unknown city.' };

  const ttl = +process.env.CACHE_TTL_CURRENT || 3600;
  cache.set(key, data, { ttl: ttl * 1000 });
  return data;
}

export async function fetchForecast(city) {
  const key = `forecast:${city.toLowerCase()}`;
  if (cache.has(key)) return cache.get(key);

  const url = buildUrl('forecast/daily', { city, days: 7 });
  const { data } = await axios.get(url);
  if (!data || !data.data || data.data.length === 0) throw { status: 404, message: 'Unknown city.' };

  const ttl = +process.env.CACHE_TTL_FORECAST || 10800;     // secondes
  cache.set(key, data, { ttl: ttl * 1000 });
  return data;
}
