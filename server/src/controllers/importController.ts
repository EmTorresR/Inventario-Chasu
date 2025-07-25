// server/src/controllers/importController.ts

import { RequestHandler } from 'express';
import Product from '../models/Product';
import ProductVariant from '../models/ProductVariant';
import QRCode from 'qrcode';

interface VariantData {
  diseño: string;
  variante: string;
  stock: number;
}

interface ImportProductData {
  nombre: string;
  codigo?: string | null;
  tipo: string;
  descripcion?: string;
  equipo?: string;
  variants?: VariantData[];
  payload?: string;
}

export const importProducts: RequestHandler = async (req, res) => {
  try {
    let data: ImportProductData = req.body;

    if (data.payload) {
      data = JSON.parse(data.payload);
    }

    if (typeof data.codigo === 'undefined') {
      data.codigo = null;
    }

    let product;

    if (data.codigo) {
      product = await Product.findOne({ where: { codigo: data.codigo } });
    }

    if (!product) {
      product = await Product.findOne({ where: { nombre: data.nombre } });
    }

    if (!product) {
      product = await Product.create({
        nombre: data.nombre,
        codigo: data.codigo,
        tipo: data.tipo,
        descripcion: data.descripcion,
        equipo: data.equipo,
      });
    } else {
      await product.update({
        nombre: data.nombre,
        codigo: data.codigo,
        tipo: data.tipo,
        descripcion: data.descripcion,
        equipo: data.equipo,
      });
    }

    if (data.variants && Array.isArray(data.variants)) {
      for (const variantData of data.variants) {
        let variant = await ProductVariant.findOne({
          where: {
            productId: product.id,
            diseño: variantData.diseño,
            variante: variantData.variante,
          },
        });

        if (!variant) {
          variant = await ProductVariant.create({
            productId: product.id,
            diseño: variantData.diseño,
            variante: variantData.variante,
            stock: variantData.stock,
            qrCode: '',
          });
        } else {
          await variant.update({
            stock: variantData.stock,
          });
        }

        const qrPayload = {
          nombre: product.nombre,
          codigo: product.codigo,
          tipo: product.tipo,
          equipo: product.equipo,
          diseño: variantData.diseño,
          variante: variantData.variante,
          stock: variantData.stock,
        };

        const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrPayload));
        await variant.update({ qrCode: qrCodeDataURL });
      }
    }

    res.status(200).json({ message: 'Importación exitosa', product });
  } catch (error: any) {
    console.error('Error al importar producto:', error);
    res.status(500).json({
      error: 'Error al importar producto',
      detalle: error.message,
    });
  }
};
