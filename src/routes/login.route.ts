import { AuthController } from "./../controllers/auth.controller";
import { Router, Request, Response } from "express";

export const loginRouter = Router();
const authController = new AuthController();

loginRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const result = await authController.login(email, password);
    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(401)
      .json({ message: error.message || "Credenciais inválidas" });
  }
});
