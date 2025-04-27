import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ['http://localhost:8080'] }));
app.use(express.json());

app.use('/weather', weatherRoutes);

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Météo', version: '1.0.0', description: 'Endpoints current weather and 7 days forecasts' }
  },
  apis: ['./routes/*.js']
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => res.status(404).json({ error: 'Unknown.' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.isAxiosError) {
    return res.status(502).json({ error: 'Service unavailable.' });
  }
  res.status(err.status || 500).json({ error: err.message || 'Internal Error.' });
});

app.listen(PORT, () => console.log(`API working on http://localhost:${PORT}`));

export default app;
