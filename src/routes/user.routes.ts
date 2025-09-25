import { Router } from "express";
import { UserController } from "../controllers/user.controllers";

const router = Router();
const userController = new UserController();

router.post("/users", async (req, res) => {
  try {
    const user = await userController.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
