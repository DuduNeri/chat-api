import type { IMessage } from "../interfaces/message.interface";
import { Message } from "../models";

export class MessageService {
  async CreateMessage(data: IMessage) {
    if (!data.content || !data.senderId || !data.receiverId) {
      throw new Error("Todos os campos são obrigatórios");
    }
    return Message.create(data)
  }
}
