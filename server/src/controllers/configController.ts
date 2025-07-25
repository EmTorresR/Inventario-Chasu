// server/src/controllers/configController.ts
import { RequestHandler } from 'express';
import { Configuration } from '../models';

export const updateAlegraConfig: RequestHandler = async (req, res) => {
  const { ALEGRA_EMAIL, ALEGRA_TOKEN } = req.body;

  if (!ALEGRA_EMAIL || !ALEGRA_TOKEN) {
    res.status(400).json({ error: 'Faltan campos obligatorios' });
    return;
  }

  try {
    await Configuration.upsert({ key: 'ALEGRA_EMAIL', value: ALEGRA_EMAIL });
    await Configuration.upsert({ key: 'ALEGRA_TOKEN', value: ALEGRA_TOKEN });
    res.json({ message: 'Configuración actualizada correctamente.' });
  } catch (error: any) {
    console.error('Error actualizando configuración:', error);
    res.status(500).json({
      error: 'Error actualizando configuración',
      detalle: error.message,
    });
  }
};
