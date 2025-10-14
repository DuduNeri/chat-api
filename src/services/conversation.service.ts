import Conversation from "../models/conversation.model";
import ConversationParticipants from "../models/conversation.participants";
import User from "../models/user.model";
import {
  IConversation,
  IConversationResponse,
} from "../interfaces/conversation.interface";
import { error } from "console";

export class ConversationService {
  async createConversation(
    data: IConversation,
    participantId: string[]
  ): Promise<IConversationResponse> {
    const conversation = await Conversation.create({
      ownerId: data.ownerId,
      title: data.title || null,
      isGroup: participantId.length > 1,
    });

    await ConversationParticipants.bulkCreate(
      participantId.map((userId) => ({
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
  // Busca uma conversa por ID
  async getConversationById(
    conversationId: string
  ): Promise<IConversationResponse> {
    const conversation = await Conversation.findByPk(conversationId, {
      include: [
        { model: User, as: "participants", attributes: ["id", "name"] },
      ],
    });
    if (!conversation) {
      throw new Error("Erro ao buscar conversa");
    }

    return conversation.toJSON() as IConversation;
  }
  // Adiciona participante
  async addParticipant(conversationId: string, userId: string): Promise<void> {
    try {
      const conversation = await Conversation.findByPk(conversationId);
      if (!conversation) throw error("Essa conversa não existe");

      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const alreadyExists = await ConversationParticipants.findOne({
        where: { conversationId, userId },
      });

      if (alreadyExists)
        throw error("Usuário já é participante desta conversa");

      await ConversationParticipants.create({
        conversationId,
        userId,
      });
      console.log(
        `✅ Usuário ${userId} adicionado à conversa ${conversationId}`
      );
    } catch (error) {
      
    }
  }

  // Remove participante
  async removeParticipant(
    conversationId: string,
    userId: string
  ): Promise<void> {
    // lógica
  }
}
