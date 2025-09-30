import express from "express";
import userRoutes from "./routes/user.routes";
import messageRoute from "./routes/message.routes";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api/message", messageRoute)

export default app;
