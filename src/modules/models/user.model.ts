// models/user.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database';// Importa la instancia de Sequelize
import Url from './url.model';

class User extends Model {}
User.init(
  {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
         field: 'user_id',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // El correo electrónico debe ser único
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Conecta el modelo con la instancia de Sequelize
    modelName: 'User', // Nombre del modelo
  }
);

// Definir la relación uno a muchos con el modelo Url
User.hasMany(Url, { foreignKey: 'userId' });

export default User;
