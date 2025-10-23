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
      throw new Error(`Erro ao buscar conversa desse usuário: ${error.message}`)
    }
  }

  async getByConversationId( conversationId: string): Promise<IConversationResponse>{
    try {
   
      return await this.conversationService.getConversationById(conversationId)
    } catch (error: any) {
       throw new Error(`Erro ao buscar conversa: ${error.message}`)
    }
  }

  async addParticipant( conversationId: string, userId: string ): Promise <void>{
     try {
      return await this.conversationService.addParticipant(conversationId, userId)
     } catch (error: any) {
      throw new Error(`Erro ao tentar adicionar participante: ${error.message}`)
     }
  }

  async removeParticipant( conversationId: string, userId: string): Promise<void> {
     try {
      return await this.conversationService.removeParticipant(conversationId, userId)
     } catch (error: any) {
      throw new Error(`Erro ao tentar remover participante: ${error.message}`)
     }
  }
}
