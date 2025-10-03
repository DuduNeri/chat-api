import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { IMessage } from "../interfaces/message.interface";

export interface IMessageCreation extends Optional<IMessage, "id" | "createdAt" | "updatedAt"> {}

class Message extends Model<IMessage, IMessageCreation> implements IMessage {
  public id!: string;
  public content!: string;
  public senderId!: string;
  public receiverId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receiverId: {
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

export default Message;
