import express from "express";
import cors from "cors"
import userRoutes from "./routes/user.routes";
import conversationRouter from "./routes/conversation.routes";
import messageRouter from "./routes/message.routes";
import { loginRouter } from "./routes/login.route";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes); 
app.use("/api/conversation", conversationRouter); 
app.use("/api/messages", messageRouter); 
app.use("/api/users", loginRouter)

export default app;
