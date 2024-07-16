import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import appError from "../utils/appError";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new appError("Access Denied. No token provided.", 401));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as { id: string };
    req.user = decoded;
    next();
  } catch (e) {
    console.error("Error: ", e);
    return next(new appError("Invalid token", 400));
  }
};
