// src/models/ConversationParticipants.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./user.model";
import Conversation from "../models/conversation.model";

class ConversationParticipants extends Model {
  public id!: string;
  public userId!: string;
  public conversationId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ConversationParticipants.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "conversation_participants",
    timestamps: true,
  }
);

// Relações
User.belongsToMany(Conversation, {
  through: ConversationParticipants,
  as: "conversations",
  foreignKey: "userId",
});

Conversation.belongsToMany(User, {
  through: ConversationParticipants,
  as: "participants",
  foreignKey: "conversationId",
});

export default ConversationParticipants;
