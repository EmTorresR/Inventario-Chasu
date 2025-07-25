// server/src/routes/productVariantsRoutes.ts
import { Router } from 'express';
import { crearProductVariant, obtenerProductVariants, actualizarProductVariant } from '../controllers/productVariantsController';
import { bulkUpdateStock } from '../controllers/stockController';

const router = Router();

// Endpoint para crear una variante para un producto específico.
// Se espera que se envíe el ID del producto en la URL.
router.post('/:productId/variants', crearProductVariant);

// Endpoint para obtener todas las variantes de un producto.
router.get('/:productId/variants', obtenerProductVariants);

// Endpoint para actualizar una variante específica (usando su ID).
router.put('/variants/:id', actualizarProductVariant);

// Endpoint para actualización masiva de stock.
router.post('/update-stock', bulkUpdateStock);

export default router;
