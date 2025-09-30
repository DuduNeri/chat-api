import type { IMessage } from "../interfaces/message.interface";
import { MessageService } from "../services/message.service";

export class MessageController {
  private messageService: MessageService;
  constructor(){
    this.messageService = new MessageService()
  }
  
  async create(data: IMessage){
   try{
    return await this.messageService.CreateMessage(data)
   }catch(error: any){
      throw new Error(`Erro ao enviar mensagem: ${error.message}`);
   }
  }
}