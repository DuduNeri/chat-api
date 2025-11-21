import Message from "../models/message.model";
import User from "../models/user.model";
import Conversation from "../models/conversation.model";


export class MessageService {
  async create(conversationId: string, senderId: string, content: string) {
    if (!conversationId) throw new Error("ID da conversa é obrigatório");
    if (!senderId) throw new Error("ID do remetente é obrigatório");
    if (!content || !content.trim())
      throw new Error("Conteúdo da mensagem é obrigatório");

    const user = await User.findByPk(senderId);
    if (!user) throw new Error("Usuário não encontrado");

    const conversation = await Conversation.findByPk(conversationId);
    if (!conversation) throw new Error("Conversa não encontrada");

    const message = await Message.create({
      conversationId,
      senderId,
      content,
    });

    await message.reload({
      include: [
        { model: User, as: "sender", attributes: ["id", "name", "email"] },
      ],
    });

    return message;
  }

  async getByConversation(conversationId: string) {
    const messages = await Message.findAll({
      where: { conversationId },
      include: [
        { model: User, as: "sender", attributes: ["id", "name", "email"] },
      ],
      order: [["createdAt", "ASC"]],
    });

    return messages;
  }

  async deleteMessage(messageId: string, userId: string) {
    const message = await Message.findByPk(messageId);
    console.log(message);

    if (!message) {
      throw new Error("Mensagem não encontrada");
    }

    if (message.senderId !== userId) {
      throw new Error("Você não pode excluir essa mensagem");
    }

    await message.destroy();

    return { messgae: "Mensagem deletada com sucesso" };
  }
}
