// server/src/routes/productosRoutes.ts
import { Router } from 'express';
import { crearProducto, obtenerProductos, actualizarProducto } from '../controllers/productosController';

const router = Router();

// Endpoint para crear un producto base.
router.post('/', crearProducto);

// Endpoint para obtener todos los productos base.
router.get('/', obtenerProductos);

// Endpoint para actualizar un producto base.
router.put('/:id', actualizarProducto);

export default router;
