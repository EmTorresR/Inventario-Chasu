// server/src/controllers/productosController.ts
import { RequestHandler } from 'express';
import Product from '../models/Product';
import ProductVariant from '../models/ProductVariant';

// Obtener todos los productos base
export const obtenerProductos: RequestHandler = async (req, res) => {
  try {
    const productos = await Product.findAll({
      include: [{ model: ProductVariant, as: 'variants' }],
    });
    res.json(productos);
  } catch (error: any) {
    console.error('Error al obtener productos:', error);
    // Devuelve un array vacío en caso de error para no romper el frontend
    res.status(200).json([]);
  }
};

// Crear un producto base
export const crearProducto: RequestHandler = async (req, res) => {
  try {
    const nuevoProducto = await Product.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error: any) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto', detalle: error.message });
  }
};

// Actualizar un producto base
export const actualizarProducto: RequestHandler = async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    await producto.update(req.body);
    res.json(producto);
  } catch (error: any) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto', detalle: error.message });
  }
};