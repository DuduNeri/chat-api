import type {
  IMessage,
  IMessageResponse,
} from "../interfaces/message.interface";
import { Message } from "../models";

export class MessageService {
  async CreateMessage(data: IMessage) {
    if (!data.content || !data.senderId || !data.receiverId) {
      throw new Error("Todos os campos são obrigatórios");
    }
    return Message.create(data);
  }

  async GetMessage(id: string): Promise<IMessageResponse> {
    const message = await Message.findByPk(id);
    if (!message) {
      throw new Error("Erro ao buscar mensagens");
    }
    return message.toJSON() as IMessageResponse;
  }

  async DeleteMessage(data: IMessageResponse) {
    const message = await Message.findByPk(data.senderId);
    if (!message) {
      throw new Error("Erro ao excluir mensagem");
    }

    await message.destroy();

    return { message: "Mensagem excluida com sucesso!" };
  }
}
