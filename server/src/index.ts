// server/src/index.ts
import express from 'express';
import cors from 'cors';
import sequelize from './config/database';

// Importar modelos y definir asociaciones
import './models';

// Importar controladores que se usan directamente en este archivo
import { crearProductVariant, obtenerProductVariants, actualizarProductVariant } from './controllers/productVariantsController';
import { bulkUpdateStock } from './controllers/stockController';
import { importProducts } from './controllers/importController';

// Importar todos los manejadores de rutas
import alegraRoutes from './routes/alegraRoutes';
import configRoutes from './routes/configRoutes';
import productosRoutes from './routes/productosRoutes';
import productVariantsRoutes from './routes/productVariantsRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Usar los manejadores de rutas
app.use('/api/config', configRoutes);
app.use('/api/productos', productosRoutes); // Manejador principal para productos
app.use('/api/product-variants', productVariantsRoutes);
app.use('/api/alegra', alegraRoutes);

// Rutas específicas que no están en los manejadores principales
app.get('/api/productos/:productId/variants', obtenerProductVariants);
app.post('/api/productos/:productId/variants', crearProductVariant);
app.put('/api/variants/:id', actualizarProductVariant);
app.post('/api/stock/bulk-update', bulkUpdateStock);
app.post('/api/import-products', importProducts);

// Sincronizar base de datos y arrancar servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
    });
  })
  .catch((err: Error) => console.error('Error al sincronizar modelos:', err));

// Ruta principal de bienvenida
app.get('/', (req, res) => {
  res.send('🚀 Backend corriendo correctamente');
});

// Manejadores de errores globales
process.on('uncaughtException', (err: Error) => {
  console.error('Excepción no capturada:', err);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('Rechazo no manejado:', reason);
});