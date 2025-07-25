// server/src/controllers/alegraController.ts
import { RequestHandler } from 'express';
import { getAlegraItems } from '../services/alegraOfficial';
import Product from '../models/Product';
import ProductVariant from '../models/ProductVariant';
import QRCode from 'qrcode';

interface AlegraItem {
  id: string;
  name: string;
  reference?: string;
  description?: string;
  type: string;
  itemCategory?: { name: string };
  customFields?: { name: string; value: string }[];
  inventory?: { unitCost: number; availableQuantity: number };
}

interface TransformedItem {
  idAlegra: string;
  nombre: string;
  codigo?: string;
  descripcion?: string;
  tipo: string;
  equipo: string;
  diseno: string;
  inventory: { unitCost: number; availableQuantity: number };
  variante: string;
}

// Obtener los ítems de Alegra sin transformación
export const obtenerItemsAlegra: RequestHandler = async (req, res) => {
  try {
    const items = await getAlegraItems();
    res.json(items);
  } catch (error: any) {
    console.error('Error al obtener ítems de Alegra:', error);
    res.status(500).json({
      error: 'Error al obtener ítems de Alegra',
      detalle: error.message,
    });
  }
};

// Transformar un item de Alegra al formato requerido en nuestra base de datos
const transformItem = (item: AlegraItem): TransformedItem => {
  const equipoField = item.customFields?.find(cf => cf.name.toLowerCase() === 'equipo');
  const disenoField = item.customFields?.find(cf => cf.name.toLowerCase() === 'diseño');
  const equipo = equipoField ? equipoField.value : '';
  const disenoCustom = disenoField ? disenoField.value : '';

  const tipo = item.itemCategory?.name || item.type;
  const unitCost = item.inventory?.unitCost || 0;
  const availableQuantity = item.inventory?.availableQuantity || 0;

  let nombre = item.name;
  let variante = '';
  if (nombre.includes(' / ')) {
    const parts = nombre.split(' / ');
    nombre = parts[0].trim();
    variante = parts[1]?.trim() || '';
  }

  return {
    idAlegra: item.id,
    nombre,
    codigo: item.reference,
    descripcion: item.description || '',
    tipo,
    equipo,
    diseno: disenoCustom,
    inventory: { unitCost, availableQuantity },
    variante,
  };
};

// Sincronizar los ítems de Alegra con la base de datos
export const sincronizarItemsAlegra: RequestHandler = async (req, res) => {
  try {
    const items = await getAlegraItems();
    console.log(
      'Datos obtenidos de Alegra antes de sincronización:',
      JSON.stringify(items, null, 2)
    );

    let countNew = 0;
    let countChanged = 0;

    for (const item of items) {
      const transformed = transformItem(item);

      let product = await Product.findOne({
        where: { codigo: transformed.codigo },
      });
      if (!product) {
        product = await Product.create({
          nombre: transformed.nombre,
          codigo: transformed.codigo,
          tipo: transformed.tipo,
          descripcion: transformed.descripcion,
          equipo: transformed.equipo,
        });
      } else {
        await product.update({
          nombre: transformed.nombre,
          tipo: transformed.tipo,
          descripcion: transformed.descripcion,
          equipo: transformed.equipo,
        });
      }

      if (item.type === 'variantParent') {
        await product.update({ idAlegra: item.id });
      }

      if (item.type !== 'variantParent') {
        let variant = await ProductVariant.findOne({
          where: {
            productId: product.id,
            diseño: transformed.diseno,
            variante: transformed.variante,
          },
        });

        if (!variant) {
          variant = await ProductVariant.create({
            productId: product.id,
            diseño: transformed.diseno,
            variante: transformed.variante,
            stock: transformed.inventory.availableQuantity,
            qrCode: '',
            idAlegra: item.id,
            unitCost: transformed.inventory.unitCost,
          });
          countNew++;
        } else {
          const currentStock = variant.stock;
          if (currentStock !== transformed.inventory.availableQuantity) {
            await variant.update({
              stock: transformed.inventory.availableQuantity,
              idAlegra: item.id,
              unitCost: transformed.inventory.unitCost,
            });
            countChanged++;
          }
        }

        const qrPayload = {
          nombre: product.nombre,
          codigo: product.codigo,
          tipo: product.tipo,
          equipo: product.equipo,
          diseño: transformed.diseno,
          variante: transformed.variante,
          stock: transformed.inventory.availableQuantity,
        };
        const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrPayload));
        await variant.update({ qrCode: qrCodeDataURL });
      }
    }

    const finalMessage =
      countNew === 0 && countChanged === 0
        ? 'No hubo cambios.'
        : `${countNew > 0 ? `Se han agregado ${countNew} nuevos producto(s). ` : ''}${
            countChanged > 0 ? `Se han actualizado ${countChanged} producto(s).` : ''
          }`;

    res.json({
      message: finalMessage,
      updatedCount: countNew + countChanged,
      countNew,
      countChanged,
    });
  } catch (error: any) {
    console.error('Error en sincronización:', error);
    res.status(500).json({
      error: 'Error en sincronización',
      detalle: error.message,
    });
  }
};
