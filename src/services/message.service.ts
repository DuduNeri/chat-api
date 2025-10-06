import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import ConversationParticipants from "../models/conversation.participants";
import User from "../models/user.model";

export class MessageService {
  async create(conversationId: string, senderId: string, content: string) {
    if (!content) throw new Error("Conteúdo da mensagem é obrigatório");

    const message = await Message.create({
      conversationId,
      senderId,
      content,
    });
    return await Message.findByPk(message.id, {
      include: [
        { model: User, as: "sender", attributes: ["id", "name", "email"] },
      ],
    });
  }
}
