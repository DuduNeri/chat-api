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

  /*
  async getConversationsByUser(userId: string): Promise<IConversationResponse[]> {
    // lógica aqui
  }

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
