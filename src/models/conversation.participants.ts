import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

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

export default ConversationParticipants;
