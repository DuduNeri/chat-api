import type {
  IMessage,
  IMessageResponse,
} from "../interfaces/message.interface";
import { MessageService } from "../services/message.service";

export class MessageController {
  private messageService: MessageService;
  constructor() {
    this.messageService = new MessageService();
  }

  async create(data: IMessage) {
    try {
      return await this.messageService.CreateMessage(data);
    } catch (error: any) {
      throw new Error(`Erro ao enviar mensagem: ${error.message}`);
    }
  }

  async geMessageById(id: string): Promise<IMessageResponse> {
    try {
      return await this.messageService.GetMessage(id);
    } catch (error: any) {
      throw new Error(`Erro ao buscar mensagem:${error.message}`);
    }
  }
}
