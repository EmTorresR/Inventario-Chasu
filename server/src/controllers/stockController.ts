// server/src/controllers/stockController.ts
import { RequestHandler } from 'express';
import ProductVariant from '../models/ProductVariant';
import alegraswaggerTest from '@api/alegraswagger-test';

interface StockUpdate {
  variantId: number;
  newStock: number;
}

// Actualización masiva de stock
export const bulkUpdateStock: RequestHandler = async (req, res) => {
  try {
    const updates: StockUpdate[] = req.body.updates;
    if (!Array.isArray(updates)) {
      res
        .status(400)
        .json({ error: 'Debe enviar un arreglo de actualizaciones en "updates"' });
      return;
    }

    const formattedDate = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Bogota',
    }).format(new Date());

    console.time('DBUpdate');
    await Promise.all(
      updates.map((u) =>
        ProductVariant.update(
          { stock: u.newStock },
          { where: { id: u.variantId } }
        )
      )
    );
    console.timeEnd('DBUpdate');

    const variantIds = updates.map((u) => u.variantId);
    const variants = await ProductVariant.findAll({ where: { id: variantIds } });
    const map: Record<number, ProductVariant> = {};
    variants.forEach((v) => (map[v.id] = v));

    const itemsForAlegra = updates
      .map((u) => {
        const variant = map[u.variantId];
        if (variant && variant.idAlegra) {
          return {
            type: 'in',
            id: variant.idAlegra.toString(),
            unitCost: variant.unitCost || 0,
            quantity: u.newStock,
          };
        }
        return null;
      })
      .filter((i): i is NonNullable<typeof i> => i !== null);

    console.time('AlegraUpdate');
    if (itemsForAlegra.length) {
      const payload = {
        warehouse: { id: '1' },
        date: formattedDate,
        items: itemsForAlegra,
      };
      await (alegraswaggerTest as any).postInventoryAdjustments(payload);
    }
    console.timeEnd('AlegraUpdate');

    res.json({ message: 'Stock actualizado exitosamente.' });
  } catch (error: any) {
    console.error('Error en bulkUpdateStock:', error);
    res
      .status(500)
      .json({ error: 'Error al actualizar stock', details: error.message });
  }
};
