import { MessageService } from "../services/message.service";

export class MessageController {
  private messageService: MessageService;
  constructor() {
    this.messageService = new MessageService();
  }

  async createMessage(
    conversationId: string,
    senderId: string,
    content: string
  ) {
    try {
      return await this.messageService.create(
        conversationId,
        senderId,
        content
      );
    } catch (error: any) {
      throw new Error("Erro ao enviar mensagem")
    }
  }
}
