import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { response } from "../utils/responseHelper";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json(response("Unauthoraized access", 401));
  }

  const decoded = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
  ) as { id: string };
  req.user = decoded;
  next();
}
