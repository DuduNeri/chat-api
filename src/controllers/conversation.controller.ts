import type {
  IConversation,
  IConversationResponse,
} from "../interfaces/conversation.interface";
import { ConversationService } from "../services/conversation.service";

export class ConversationController {
  private conversationService: ConversationService;

  constructor() {
    this.conversationService = new ConversationService();
  }

  async create(
    data: IConversation,
    participantId: string[]
  ): Promise<IConversationResponse> {
    try {
      console.log(data)
      console.log(participantId)
      return await this.conversationService.createConversation(
        data,
        participantId
      );
    } catch (error: any) {
      throw new Error(`Erro ao criar sala: ${error.message}`);
    }
  }

  async getByUser(userId: string): Promise<IConversationResponse[]>{
    try {
      return await this.conversationService.getConversationsByUser(userId)
    } catch (error: any) {
      throw new Error("Erro ao buscar conversas desse usuário")
    }
  }

  async getByConversationId( conversationId: string): Promise<IConversationResponse>{
    try {
      return await this.conversationService.getConversationById(conversationId)
    } catch (error: any) {
       throw new Error("Erro ao buscar a conversa desse usuário")
    }
  }
}
