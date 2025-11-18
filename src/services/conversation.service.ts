import Conversation from "../models/conversation.model";
import ConversationParticipants from "../models/conversation.participants";
import User from "../models/user.model";
import Message from "../models/message.model";
import {
  IConversation,
  IConversationResponse,
} from "../interfaces/conversation.interface";
import { Op } from "sequelize";
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

    await conversation.reload({
      include: [
        { model: User, as: "participants", attributes: ["id", "name"] },
      ],
    });

    const conv = conversation.toJSON() as IConversationResponse;
    conv.participants = (conv.participants ?? []).map((p) => ({
      id: p.id,
      name: p.name,
    }));

    return conv;
  }

  async getConversationsByUser(
    userId: string
  ): Promise<IConversationResponse[]> {
    const conversations = await Conversation.findAll({
      where: { ownerId: userId },
    });

    return conversations.map((c) => c.toJSON() as IConversationResponse);
  }

  async getConversationById(
    conversationId: string
  ): Promise<IConversationResponse> {
    const conversation = await Conversation.findByPk(conversationId, {
      include: [
        { model: User, as: "participants", attributes: ["id", "name"] },
        {
          model: Message,
          as: "messages",
          include: [{ model: User, as: "sender", attributes: ["id", "name"] }],
        },
      ],
      order: [[{ model: Message, as: "messages" }, "createdAt", "ASC"]],
    });

    if (!conversation) throw new Error("Conversa não encontrada");

    const conv = conversation.toJSON() as IConversationResponse;

    conv.participants = (conv.participants ?? []).map((p) => ({
      id: p.id,
      name: p.name,
    }));

    conv.messages = (conv.messages ?? []).map((m) => ({
      id: m.id,
      content: m.content,
      sender: { id: m.sender.id, name: m.sender.name },
      createdAt: m.createdAt,
    }));

    return conv;
  }
  async addParticipant(conversationId: string, userId: string): Promise<void> {
    const conversation = await Conversation.findByPk(conversationId);
    if (!conversation) throw new Error("Essa conversa não existe");

    const user = await User.findByPk(userId);
    if (!user) throw new Error("Usuário não encontrado");

    const alreadyExists = await ConversationParticipants.findOne({
      where: { conversationId, userId },
    });
    if (alreadyExists)
      throw new Error("Usuário já é participante desta conversa");

    const participantCount = await ConversationParticipants.count({
      where: { conversationId },
    });
    if (participantCount >= 50)
      throw new Error("Limite máximo de 50 participantes atingido");

    await ConversationParticipants.create({ conversationId, userId });
  }

  async removeParticipant(
    conversationId: string,
    userId: string
  ): Promise<void> {
    const conversation = await Conversation.findByPk(conversationId);
    if (!conversation) throw new Error("Conversa não encontrada");

    const user = await User.findByPk(userId);
    if (!user) throw new Error("Usuário não encontrado");

    const participant = await ConversationParticipants.findOne({
      where: { conversationId, userId },
    });
    if (!participant)
      throw new Error("Participante não encontrado na conversa");

    await participant.destroy();
  }

  async deleteChat(conversationId: string, userId: string) {
    const conversation = await Conversation.findByPk(conversationId);

    if (!conversation) {
      return { ok: false, message: "Conversa não encontrada" };
    }

    // Verifica se o usuário é dono da conversa
    if (conversation.ownerId !== userId) {
      return {
        ok: false,
        message: "Você não tem permissão para excluir esta conversa",
      };
    }

    await conversation.destroy();

    return { ok: true, message: "Conversa excluída com sucesso" };
  }
}
