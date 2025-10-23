import express from "express";
import userRoutes from "./routes/user.routes";
import conversationRouter from "./routes/conversation.routes";
import messageRouter from "./routes/message.routes";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes); 
app.use("/api/conversation", conversationRouter); 
app.use("/api/messages", messageRouter); 

export default app;
