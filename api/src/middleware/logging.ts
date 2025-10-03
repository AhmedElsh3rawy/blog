import logger from "../config/logger";
import type { Request, Response, NextFunction } from "express";

export const logging = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};
