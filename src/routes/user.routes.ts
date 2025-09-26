import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controllers";

const router = Router();
const userController = new UserController();

router.post("/users", async (req: Request, res: Response) => {
  try {
    const user = await userController.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
   try {
    const { id } = req.params
    const user = await userController.get(id);
    res.status(201).json(user)
   } catch (error: any) {
    res.status(400).json({ message: error.message})
   }
})

export default router;
