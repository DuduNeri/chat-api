import { Router, Response, Request } from "express";
import { ConversationController } from "../controllers/conversation.controller";
import { z } from "zod"

const conversationRouter = Router();
const conversationController = new ConversationController();

console.log("🚀 Conversation router carregado");

conversationRouter.post("/sala", async (req: Request, res: Response) => {
  try {
    const { title, ownerId, participantId } = req.body;
    const conversation = await conversationController.create(
      { ownerId, title },
      participantId
    );
    res.status(201).json(conversation);
  } catch (error: any) {
    res.status(400).json({
      message: "Erro ao criar conversa",
      error: error.message,
    });
  }
});

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
  "/:conversationId",
  async (req: Request, res: Response) => {
    console.log("Rota /:conversationId chamada", req.params.conversationId);
    try {
      const { conversationId } = req.params;
      const conversation = await conversationController.getByConversationId(
        conversationId
      );
      console.log(conversation);
      res.status(200).json(conversation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

conversationRouter.post(
  "/:conversationId/participants",
  async (req: Request, res: Response) => {
    try {
      const { conversationId } = req.params;
      const { userId } = req.body;

      await conversationController.addParticipant(conversationId, userId);
      res.status(200).json({ message: "Participante adicionado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

conversationRouter.delete(
  "/:conversationId/participants/:userId",
  async (req: Request, res: Response) => {
    try {
      const { conversationId, userId } = req.params;
      await conversationController.removeParticipant(conversationId, userId);
      res.status(200).json({ message: "Participante removido com sucesso" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default conversationRouter;
