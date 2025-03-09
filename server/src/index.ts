import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta básica
app.get('/', (req, res) => {
  res.send('Bienvenido al API de Inventario-Chasu');
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
