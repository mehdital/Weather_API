# API Météo – Stack Labs (Node 18 + Express + Docker)

## requirment 

* Docker 
* WeatherBit API KEY → <https://www.weatherbit.io/account/create>  
* Ports **3000** (API) and **8080** (UI)

## launch

```bash
git clone https://github.com/mehdital/Weather_API
cd ./Weather_API
cp backend/.env.example backend/.env   # fill YOUR_API_KEY
cd ./backend
npm install
npm test
docker compose up --build

localhost:3000/docs --> swagger
localhort:8080      --> Front-end
localhost:3000      --> Back-end URL

Endpoints :
/weather/current	location	{ location, description, temperature, windSpeed_kmh, humidity }
    ex]
{
    "location": "Toulouse, FR",
    "description": "Ciel clair",
    "temperature": 16,
    "windSpeed_kmh": 18.4,
    "humidity": 51
}


/weather/forecast	location	{ evolution, temperatureTrend, pressureTrend, averageWind, forecast[7] }
    ex]
{
    "location": "Toulouse, FR",
    "evolution": "en dégradation",
    "temperatureTrend": "en forte baisse",
    "pressureTrend": "en baisse",
    "averageWind": {
        "speed_kmh": 16.7,
        "beaufort": 3,
        "description": "Petite brise"
    },
    "forecast": [
        {
            "date": "2025-05-02",
            "temperature": 18.5,
            "pressure": 996,
            "wind": {
                "speed_kmh": 24.1,
                "beaufort": 4,
                "description": "Jolie brise"
            }
        },
        {...}
    ]
}
