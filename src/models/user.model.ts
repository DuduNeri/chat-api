import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true
  }
);

export default User;
