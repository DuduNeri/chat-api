import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/users", async (req: Request, res: Response) => {
  try {
    const user = await userController.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userController.getById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userController.getAll();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userController.delete(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await userController.update(id, data);
    return res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      user: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Erro ao atualizar usuário",
      error: error.message,
    });
  }
});

export default router;
