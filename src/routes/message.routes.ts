import { Router, Request, Response } from "express";
import { MessageController } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const messageRouter = Router();
const messageController = new MessageController();

messageRouter.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { conversationId, senderId, content } = req.body;

    if (!conversationId || !senderId || !content) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    const result = await messageController.createMessage(
      conversationId,
      senderId,
      content
    );

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    return res.status(201).json(result.message);
  } catch (error: any) {
    console.error("Erro ao enviar mensagem:", error.message);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

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
