import { fetchCurrent, fetchForecast } from '../services/weatherbitService.js';
import { convertWindToBeaufort } from '../utils/beaufort.js';

export async function getCurrent(req, res, next) {
  const { location } = req.query;
  if (!location) return res.status(400).json({ error: "location required." });
  try {
    const data = await fetchCurrent(location);
    const d = data.data[0];
    res.json({
      location: `${d.city_name}, ${d.country_code}`,
      description: d.weather.description,
      temperature: d.temp,
      windSpeed_kmh: +(d.wind_spd * 3.6).toFixed(1),// m/s to km/h
      humidity: d.rh
    });
  } catch (err) {
    next(err);
  }
}

export async function getForecast(req, res, next) {
  const { location } = req.query;
  if (!location) return res.status(400).json({ error: "location required." });
  try {
    const data = await fetchForecast(location);
    const forecast = data.data.map(d => {
      const speedKmh = +(d.wind_spd * 3.6).toFixed(1); // m/s to km/h
      const beaufort = convertWindToBeaufort(speedKmh);
      return {
        date: d.valid_date,
        temperature: d.temp,
        pressure: d.pres,
        wind: { speed_kmh: speedKmh, ...beaufort }
      };
    });
    res.json({ location: `${data.city_name}, ${data.country_code}`, forecast });
  } catch (err) {
    next(err);
  }
}
