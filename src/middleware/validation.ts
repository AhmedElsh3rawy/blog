import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validationResult, Result } from "express-validator";

export const validation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((error) => ({
        field: error.param,
        message: error.msg,
      }));
      return res.status(400).json({
        message: "Validation faild",
        errors: formattedErrors,
        statusCode: 400,
      });
    }
    next();
  },
);
