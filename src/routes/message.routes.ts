import { Router, Request, Response } from "express";
import { MessageController } from "../controllers/message.controller";

const messageRouter = Router()
const messageController = new MessageController()

messageRouter.post("/message", async (req: Request, res: Response) => {

})

export default messageRouter;