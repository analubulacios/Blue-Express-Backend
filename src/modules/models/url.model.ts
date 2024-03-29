import { DataTypes } from "sequelize";
import sequelize from "../../database";

const Url = sequelize.define("urls", {
  url_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  original_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  short_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  creation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deletion_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
   clicks: {
     type: DataTypes.INTEGER,
     allowNull: false,
     defaultValue: 0,
   }
});

export default Url;