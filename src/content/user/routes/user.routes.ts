import { Router } from "express";
import { UserController } from "../user.index";

const router = Router();

router.post("/signup", UserController.CreateUser);
router.get("/:id", UserController.GetUser);
router.patch("/:id", UserController.UpdateUser);
router.delete("/:id", UserController.DeleteUser);

export default router;
