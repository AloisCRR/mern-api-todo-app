import { Router } from "express";
import { UserController } from "../user.index";

const router = Router();

router.post("/signup", UserController.CreateUser);
router.post("/login", UserController.LogInUser);
router.post("/logout", UserController.authenticate, UserController.LogOutUser);
router.get("/me", UserController.authenticate, UserController.GetUser);

export default router;
