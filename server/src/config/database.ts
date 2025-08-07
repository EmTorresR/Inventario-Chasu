// server/src/config/database.ts
import { Sequelize } from 'sequelize';

const DB_NAME: string = process.env.DB_NAME || 'bd_chazu';
const DB_USER: string = process.env.DB_USER || 'root';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '34577';
const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_PORT    = process.env.DB_PORT    ? parseInt(process.env.DB_PORT) : 3306;

console.log(`🔌 Conectando a MySQL en ${DB_HOST}:${DB_PORT} — 
  user=${DB_USER} db=${DB_NAME}`);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST, // En Docker se configuraría como "mysql" o según el nombre del servicio
  port: DB_PORT,
  dialect: 'mysql',
  logging: false, // Cambia a console.log para ver los queries (útil para debug)
});

console.log('Archivo database.ts cargado. Intentando conectar a MySQL...');

async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL exitosa.');
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
  }
}

testConnection();

export default sequelize;
