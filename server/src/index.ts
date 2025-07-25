import express from 'express';
import sequelize from './config/database';
import './models/Configuration';
import './models/Product';
import './models/ProductVariant';

// Importar controladores
import { obtenerProductos, crearProducto, actualizarProducto } from './controllers/productosController';
import { crearProductVariant, obtenerProductVariants, actualizarProductVariant } from './controllers/productVariantsController';
import { bulkUpdateStock } from './controllers/stockController';
import { importProducts } from './controllers/importController';

// Importar rutas
import alegraRoutes from './routes/alegraRoutes';
import configRoutes from './routes/configRoutes';
import productosRoutes from './routes/productosRoutes';
import productVariantsRoutes from './routes/productVariantsRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Rutas de configuración
app.use('/api/config', configRoutes);

// Rutas de productos
app.get('/api/productos', obtenerProductos);
app.post('/api/productos', crearProducto);
app.put('/api/productos/:id', actualizarProducto);

// Rutas de variantes de producto
app.get('/api/productos/:productId/variants', obtenerProductVariants);
app.post('/api/productos/:productId/variants', crearProductVariant);
app.put('/api/variants/:id', actualizarProductVariant);

// Ruta para actualización masiva de stock
app.post('/api/stock/bulk-update', bulkUpdateStock);

// Ruta para importar productos
app.post('/api/import-products', importProducts);
app.use('/api/productos', productosRoutes);
app.use('/api/product-variants', productVariantsRoutes);

// Rutas de integración con Alegra
app.use('/api/alegra', alegraRoutes);

sequelize.sync({ alter: true })
  .then(() => console.log('Modelos sincronizados'))
  .catch((err) => console.error('Error sincronizando modelos:', err));

  app.get('/', (req, res) => {
    res.send('🚀 Backend corriendo correctamente');
  });
  

app.listen(port, () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});
