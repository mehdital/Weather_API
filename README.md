# API Météo – Stack Labs (Node 18 + Express + Docker)

## launch

```bash
git clone <repo>
cd <repo>
cp backend/.env.example backend/.env   # fill YOUR_API_KEY
cd backend
npm install
npm test
docker compose up --build

localhost:3000/docs --> swagger
localhost:3000      --> Back-end URL
localhort:8080      --> Front-end