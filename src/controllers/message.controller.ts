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
  ): Promise<{ success: boolean; message?: any; error?: string }> {
    try {
      const message = await this.messageService.create(
        conversationId,
        senderId,
        content
      );
      return { success: true, message };
    } catch (error: any) {
      console.error("Erro ao enviar mensagem:", error.message);
      return { success: false, error: "Erro ao enviar mensagem" };
    }
  }
}
