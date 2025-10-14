import { Router, Response, Request } from "express";
import { ConversationController } from "../controllers/conversation.controller";

const conversationRouter = Router();
const conversationController = new ConversationController();

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
// conversation.routes.ts
conversationRouter.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const conversations = await conversationController.getByUser(userId);
    res.status(200).json(conversations);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

conversationRouter.get(
  "/user/:conversationId",
  async (req: Request, res: Response) => {
    try {
      const { conversationId } = req.params;
      const conversation = await conversationController.getByConversationId(
        conversationId
      );
      res.status(200).json(conversation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default conversationRouter;
