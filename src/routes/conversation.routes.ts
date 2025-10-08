import { Router, Response, Request } from "express";
import { ConversationController } from "../controllers/conversation.controller";

const conversationRouter = Router();
const conversationController = new ConversationController();

/**
 * 🟢 Criar nova sala (conversa)
 */
conversationRouter.post("/sala", async (req: Request, res: Response) => {
  try {
    const { title, ownerId, participantId } = req.body;
    const conversation = await conversationController.create(
      { ownerId, title }, // IConversation
      participantId // array de participantes
    );

    res.status(201).json(conversation);
  } catch (error: any) {
    res.status(400).json({
      message: "Erro ao criar sala",
      error: error.message,
    });
  }
});

/**
 * 🔵 Buscar todas as conversas de um usuário
 */
conversationRouter.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const conversation = await conversationController.getConversation(userId);
    res.status(200).json(conversation);
  } catch (error: any) {
    res.status(400).json({
      message: "Erro ao buscar conversas do usuário",
      error: error.message,
    });
  }
});

/**
 * 🟣 Buscar conversa específica pelo ID
 */
conversationRouter.get("/conversation/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const conversation = await conversationController.getConversationById(id);
    res.status(200).json(conversation);
  } catch (error: any) {
    res.status(400).json({
      message: "Erro ao buscar conversa",
      error: error.message,
    });
  }
});

/**
 * 🟠 Adicionar participante a uma conversa
 */
conversationRouter.post("/add-participante", async (req: Request, res: Response) => {
  try {
    const { conversationId, userId } = req.body;
    const newParticipant = await conversationController.addParticipant(conversationId, userId);
    res.status(200).json(newParticipant);
  } catch (error: any) {
    res.status(400).json({
      message: "Erro ao adicionar participante",
      error: error.message,
    });
  }
});

export default conversationRouter;
