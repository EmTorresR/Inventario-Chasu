// server/src/routes/alegraRoutes.ts
import { Router } from 'express';
import { obtenerItemsAlegra, sincronizarItemsAlegra } from '../controllers/alegraController';

const router = Router();

router.get('/items', obtenerItemsAlegra);
router.post('/sincronizar', sincronizarItemsAlegra);

export default router;
