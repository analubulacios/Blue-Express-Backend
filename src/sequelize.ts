import { Sequelize } from 'sequelize';

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('blueexpress', 'postgres', 'tu_contraseña', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

export default sequelize;
