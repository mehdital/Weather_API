import { fetchCurrent, fetchForecast }  from '../services/weatherbitService.js';
import { convertWindToBeaufort }        from '../utils/beaufort.js';
import { trend, evolution }      from '../utils/trend.js';

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
  } catch (err) { next(err); }
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

    const temps  = forecast.map(d => d.temperature);
    const press  = forecast.map(d => d.pressure);
    const winds  = forecast.map(d => d.wind.speed_kmh);

    const tempTrend = trend(temps);                 // hausse / stable / baisse
    const presTrend = trend(press, { strong: 8, weak: 2 });
    const evol      = evolution(tempTrend, presTrend);

    const meanWind  = winds.reduce((a, v) => a + v, 0) / winds.length;
    const beaufort  = convertWindToBeaufort(meanWind);

    res.json({
      location         : `${data.city_name}, ${data.country_code}`,
      evolution        : evol,
      temperatureTrend : tempTrend,
      pressureTrend    : presTrend,
      averageWind      : { speed_kmh: +meanWind.toFixed(1), ...beaufort },
      forecast
    });
  } catch (err) { next(err); }
}
