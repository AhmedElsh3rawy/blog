import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const time = new Date().toISOString();

  console.log(
    `${req.method} ${req.originalUrl} - ${ip} (${userAgent}) - ${time}`,
    "\n",
  );

  next();
};
