import { error } from "console";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);
  res.status(err.status || 500).json({
    status: err.statusText,
    message: err.message,
    statusCode: err.statusCode || 500,
    stack: err.stack,
  });
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  next(new AppError("Resource not found", 404));
}
