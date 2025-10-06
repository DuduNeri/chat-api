import { Router, Request, Response } from "express";
import { MessageController } from "../controllers/message.controller";

const messageRouter = Router()
const messageController = new MessageController()

messageController.post("/message")

export default messageRouter;