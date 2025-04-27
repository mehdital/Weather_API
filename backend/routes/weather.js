import { Router } from 'express';
import { getCurrent, getForecast } from '../controllers/weatherController.js';

const router = Router();

/**
 * @openapi
 * /weather/current:
 *   get:
 *     summary: Météo actuelle d’une ville.
 *     parameters:
 *       - in: query
 *         name: location
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Données météo du moment. }
 *       400: { description: Paramètre manquant. }
 *       404: { description: Ville inconnue. }
 */
router.get('/current', getCurrent);

/**
 * @openapi
 * /weather/forecast:
 *   get:
 *     summary: Prévisions 7 jours d’une ville.
 *     parameters:
 *       - in: query
 *         name: location
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Tendances météo. }
 *       400: { description: Paramètre manquant. }
 *       404: { description: Ville inconnue. }
 */
router.get('/forecast', getForecast);

export default router;
