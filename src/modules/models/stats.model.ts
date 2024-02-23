import { DataTypes } from "sequelize";
import sequelize from "../../database";
import Url from "./url.model";

const Stats = sequelize.define("stats", {
  stats_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  click_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  last_accessed: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  url_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

Url.hasOne(Stats, { foreignKey: "url_id" });

export default Stats;