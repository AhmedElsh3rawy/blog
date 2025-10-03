import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import AppError from "../utils/appError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.statusCode || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;

  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    status,
  });

  res.status(status).json({
    success: false,
    error: message,
  });
};

export const notFound = (req: Request, res: Response) => {
  logger.warn(`Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).send("Not Found");
};
