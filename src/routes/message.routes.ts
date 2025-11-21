import { Router, Request, Response } from "express";
import { MessageController } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const messageRouter = Router();
const messageController = new MessageController();

messageRouter.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { conversationId, content } = req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Usuário não autenticado" });
    }

    const senderId = req.user.id;

    if (!conversationId || !content) {
      return res.status(400).json({ success: false, message: "Dados inválidos" });
    }

    const result = await messageController.createMessage(conversationId, senderId, content);

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.error });
    }

    return res.status(201).json({ success: true, message: result.message });
  } catch (error: any) {
    console.error("Erro ao enviar mensagem:", error.message);
    res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
});



messageRouter.get(
  "/:conversationId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { conversationId } = req.params;

      const result = await messageController.getMessagesBy(conversationId);

      if (!result.success) {
        return res.status(400).json({ message: result.error });
      }

      return res.status(200).json(result.messages);
    } catch (error: any) {
      console.error("Erro ao listar mensagens:", error.message);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

messageRouter.delete("/:messageId", authMiddleware, async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = (req as any).user.id;

    const result = await messageController.delete(messageId, userId);

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    return res.status(200).json({ message: result.message });
  } catch (error: any) {
    console.error("Erro ao deletar mensagem:", error.message);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default messageRouter;
