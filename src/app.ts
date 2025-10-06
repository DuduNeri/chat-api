import express from "express";
import userRoutes from "./routes/user.routes";
import conversationRouter from "./routes/conversation.routes";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", conversationRouter)

export default app;
