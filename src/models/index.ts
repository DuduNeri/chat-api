// models/index.ts
import User from "./user.model";
import Message from "./message.model";

// Um usuário pode ENVIAR muitas mensagens
User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });

// Um usuário pode RECEBER muitas mensagens
User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

export { User, Message };
