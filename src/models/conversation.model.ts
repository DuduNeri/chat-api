import {
  DataTypes,
  Model,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
} from "sequelize";
import { sequelize } from "../config/db";
import User from "./user.model";

class Conversation extends Model {
  public id!: string;
  public title!: string | null;
  public isGroup!: boolean;
  public ownerId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 💡 Aqui você declara os mixins para o TS entender
  public addParticipant!: BelongsToManyAddAssociationMixin<User, string>;
  public getParticipants!: BelongsToManyGetAssociationsMixin<User>;
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

// Dono da conversa
Conversation.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

// Associação N:N — participantes da conversa
Conversation.belongsToMany(User, {
  through: "conversation_participants",
  as: "participants",
  foreignKey: "conversationId",
});

User.belongsToMany(Conversation, {
  through: "conversation_participants",
  as: "conversations",
  foreignKey: "userId",
});

export default Conversation;
