import { DataTypes } from "sequelize";
import sequelize from "../../database";
import Url from "./url.model";


const User = sequelize.define("users", {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Url, { foreignKey: "user_id" });
Url.belongsTo(User, { foreignKey: "user_id" });

export default User;