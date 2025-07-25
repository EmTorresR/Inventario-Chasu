// server/src/controllers/productVariantsController.ts
import { RequestHandler } from 'express';
import ProductVariant from '../models/ProductVariant';
import Product from '../models/Product';

// Crear una variante para un producto específico
export const crearProductVariant: RequestHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ error: 'Producto base no encontrado' });
      return;
    }
    const { diseño, variante, stock, qrCode } = req.body;
    const nuevaVariante = await ProductVariant.create({
      productId: product.id,
      diseño,
      variante,
      stock,
      qrCode,
    });
    res.status(201).json(nuevaVariante);
  } catch (error: any) {
    console.error('Error al crear la variante:', error);
    res
      .status(500)
      .json({ error: 'Error al crear la variante', detalle: error.message });
  }
};

// Obtener todas las variantes de un producto
export const obtenerProductVariants: RequestHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    const variants = await ProductVariant.findAll({
      where: { productId },
    });
    res.json(variants);
  } catch (error: any) {
    console.error('Error al obtener variantes:', error);
    res
      .status(500)
      .json({ error: 'Error al obtener variantes', detalle: error.message });
  }
};

// Actualizar una variante específica
export const actualizarProductVariant: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await ProductVariant.findByPk(id);
    if (!variant) {
      res.status(404).json({ error: 'Variante no encontrada' });
      return;
    }
    await variant.update(req.body);
    res.json(variant);
  } catch (error: any) {
    console.error('Error al actualizar la variante:', error);
    res
      .status(500)
      .json({ error: 'Error al actualizar la variante', detalle: error.message });
  }
};
