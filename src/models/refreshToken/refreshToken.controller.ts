import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { refreshJwt, revokeRefreshJwt } from "./refreshToken.service";

export async function handleRefreshJwtAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshedJwtAuth = await refreshJwt(
      req.ip,
      req.user,
      req.cookies["refreshJwt"]
    );

    return res
      .status(StatusCodes.OK)
      .cookie("jwt", refreshedJwtAuth, {
        httpOnly: true,
        secure: false,
      })
      .end();
  } catch (error) {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        secure: false,
      })
      .clearCookie("refreshJwt", {
        httpOnly: true,
        secure: false,
      })
      .end();

    return next(error);
  }
}

export async function handleRevokeRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await revokeRefreshJwt(req.ip, req.cookies["jwt"]);

    return res.status(StatusCodes.OK).end();
  } catch (error) {
    return next(error);
  }
}

const router = Router();

router.use("/", handleRefreshJwtAuth);
router.use("/revoke", handleRevokeRefreshToken);

export default router;
