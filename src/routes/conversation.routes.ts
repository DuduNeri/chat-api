import { Router, Response, Request } from "express";
import { ConversationController } from "../controllers/conversation.controller";

const conversationRouter = Router();
const conversationController = new ConversationController();

conversationRouter.post("Sala", async (req: Request, res: Response) => {
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

export default conversationRouter;
