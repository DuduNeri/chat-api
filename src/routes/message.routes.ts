import { Router, Request, Response } from "express";
import { MessageController } from "../controllers/message.controller";

const messageRouter = Router();
const messageController = new MessageController();

messageRouter.post("/message", async (req: Request, res: Response) => {
  try {
    const { conversationId, senderId, content } = req.body;
    const newmessage = await messageController.createMessage(
      conversationId,
      senderId,
      content
    );
    res.status(201).json(newmessage);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

export default messageRouter;
