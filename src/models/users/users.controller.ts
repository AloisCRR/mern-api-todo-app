import { checkAuth, sendAuthResponse } from "@authentication/auth.controller";
import { serializer } from "@common/middlewares/serialize.middleware";
import { RefreshJwtAuth } from "@models/refreshToken/refreshToken.module";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser } from "./interfaces/user.interface";
import { userBody, userLogIn } from "./serializers/user.serializer";
import { LogIn, SignUp } from "./users.service";

async function handleSignUp(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await SignUp(req.body as IUser, req.ip);
    return sendAuthResponse(res, user, true);
  } catch (error) {
    return next(error);
  }
}

async function handleLogIn(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await LogIn(req.body.email, req.body.password, req.ip);
    return sendAuthResponse(res, user);
  } catch (error) {
    return next(error);
  }
}

function handleLogOut(_: Request, res: Response) {
  return res.clearCookie("jwt", { httpOnly: true, secure: false }).end();
}

function handleGetMe(req: Request, res: Response) {
  return res
    .status(req.user ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
    .json(req.user);
}

const router = Router();

router.post("/signup", serializer(userBody, "body"), handleSignUp);
router.post("/login", serializer(userLogIn, "body"), handleLogIn);
router.post("/logout", handleLogOut);
router.patch("/refresh-token", checkAuth, RefreshJwtAuth);
router.get("/me", checkAuth, handleGetMe);

export default router;
