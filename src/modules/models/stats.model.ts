import { DataTypes } from "sequelize";
import sequelize from "../../database";
import Url from "./url.model";

const Stats = sequelize.define("url_stats", {
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
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Url.hasOne(Stats, { foreignKey: "url_id" });

export default Stats;