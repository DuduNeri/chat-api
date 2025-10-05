// src/models/Message.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./user.model";
import Conversation from "./conversation.model";

class Message extends Model {
  public id!: string;
  public content!: string;
  public conversationId!: string;
  public senderId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "messages",
    timestamps: true,
  }
);

// Relacionamentos
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Message.belongsTo(Conversation, { foreignKey: "conversationId", as: "conversation" });

Conversation.hasMany(Message, { foreignKey: "conversationId", as: "messages" });

export default Message;
