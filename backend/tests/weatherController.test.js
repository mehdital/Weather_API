import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/weatherbitService.js', () => ({
  fetchCurrent : jest.fn(),
  fetchForecast: jest.fn()
}));

const service = await import('../services/weatherbitService.js');
const { getCurrent, getForecast } = await import('../controllers/weatherController.js');

const CURRENT_MOCK = {
  data: [
    {
      city_name : 'Paris',
      country_code: 'FR',
      weather: { description: 'Ciel dégagé' },
      temp : 20,
      wind_spd: 5,
      rh   : 50
    }
  ]
};
const FORECAST_MOCK = {
  city_name: 'Paris',
  country_code: 'FR',
  data: Array.from({ length: 7 }, (_, i) => ({
    valid_date: `2025-05-0${i + 1}`,
    temp : 18 + i,
    pres : 1010 - i,
    wind_spd: 4 + i
  }))
};

beforeAll(() => {
  service.fetchCurrent.mockResolvedValue(CURRENT_MOCK);
  service.fetchForecast.mockResolvedValue(FORECAST_MOCK);
  process.env.WEATHERBIT_API_KEY = 'MOCK_API';
});

const makeRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
};

describe('weatherController', () => {
  test('400 if no location', async () => {
    const req = { query: {} };
    const res = makeRes();
    await getCurrent(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('current OK', async () => {
    const req = { query: { location: 'Paris' } };
    const res = makeRes();
    await getCurrent(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        location: 'Paris, FR',
        temperature: 20
      })
    );
  });

  test('forecast → 7 days', async () => {
    const req = { query: { location: 'Paris' } };
    const res = makeRes();
    await getForecast(req, res, jest.fn());
    const { forecast } = res.json.mock.calls[0][0];
    expect(forecast).toHaveLength(7);
  });
});