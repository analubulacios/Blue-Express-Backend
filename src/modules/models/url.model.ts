// models/url.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../sequelize';  // Importa la instancia de Sequelize
import User from './user.model'; // Importa el modelo de usuario

class Url extends Model {}
Url.init(
  {
    urlId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'url_id',
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
  },
  {
    sequelize, // Conecta el modelo con la instancia de Sequelize
    modelName: 'Url', // Nombre del modelo
  }
);

Url.belongsTo(User, { foreignKey: 'userId' });

export default Url;

