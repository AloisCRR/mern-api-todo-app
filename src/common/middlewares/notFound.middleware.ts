import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function notFound(req: Request, res: Response) {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: "No route found or method",
    method: req.method,
    route: req.url,
  });
}
