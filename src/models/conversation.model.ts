// src/models/Conversation.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./user.model";

class Conversation extends Model {
  public id!: string;
  public title!: string | null; // nome opcional da conversa/grupo
  public isGroup!: boolean; // conversa privada ou grupo
  public ownerId!: string; // usuário que criou a conversa

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Conversation.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isGroup: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "conversations",
    timestamps: true,
  }
);

// Relacionamento opcional com o dono da conversa
Conversation.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

export default Conversation;
