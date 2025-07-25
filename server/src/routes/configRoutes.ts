// server/src/routes/configRoutes.ts
import { Router } from 'express';
import { updateAlegraConfig } from '../controllers/configController';

const router = Router();

router.put('/update', updateAlegraConfig);

export default router;
