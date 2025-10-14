import express from "express";
import userRoutes from "./routes/user.routes";
import conversationRouter from "./routes/conversation.routes";
import messageRouter from "./routes/message.routes";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", conversationRouter);
app.use("/api", messageRouter);

export default app;
