import { Router, Request, Response } from "express";
import { MessageController } from "../controllers/message.controller";

const messageRoute = Router();
const messageController = new MessageController();

messageRoute.post("/", async (req: Request, res: Response) => {
  try {
    const message = await messageController.create(req.body);
    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

messageRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await messageController.geMessageById(id);
    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default messageRoute;
