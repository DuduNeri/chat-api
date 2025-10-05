import Conversation from "../models/conversation.model";
import ConversationParticipants from "../models/conversation.participants";
import User from "../models/user.model";
import {
  IConversation,
  IConversationResponse,
} from "../interfaces/conversation.interface";

export class ConversationService {
  async createConversation(
    data: IConversation,
    participantIds: string[]
  ): Promise<IConversationResponse> {
    const conversation = await Conversation.create({
      ownerId: data.ownerId,
      title: data.title || null,
      isGroup: participantIds.length > 1,
    });

    await ConversationParticipants.bulkCreate(
      participantIds.map((userId) => ({
        conversationId: conversation.id,
        userId,
      }))
    );

    const result = await Conversation.findByPk(conversation.id, {
      include: [
        { model: User, as: "participants", attributes: ["id", "name"] },
      ],
    });

    return result!.toJSON() as IConversationResponse;
  }

  async getConversationsByUser(
    userId: string
  ): Promise<IConversationResponse[]> {
    const conversation = await Conversation.findAll({
      include: [
        {
          model: User,
          as: "participants",
          where: { id: userId },
          attributes: ["id", "name"],
        },
      ],
    });

    if (!conversation || conversation.length === 0) {
      throw new Error("Nenhuma conversa encontrada para esse usuário");
    }

    return conversation.map((c) => c.toJSON() as IConversationResponse);
  }
  /*
  // Busca uma conversa por ID
  async getConversationById(conversationId: string): Promise<IConversationResponse> {
    // lógica aqui
  }

  // Adiciona participante
  async addParticipant(conversationId: string, userId: string): Promise<void> {
    // lógica aqui
  }

  // Remove participante
  async removeParticipant(conversationId: string, userId: string): Promise<void> {
    // lógica aqui
  }
  */
}
