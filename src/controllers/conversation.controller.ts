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

async create(data: IConversation, participantIds: string[]): Promise<IConversationResponse> {
  try {
    return await this.conversationService.createConversation(data, participantIds);
  } catch (error: any) {
    throw new Error(`Erro ao criar sala: ${error.message}`);
  }
}

}
