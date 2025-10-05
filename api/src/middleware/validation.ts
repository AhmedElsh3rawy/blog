import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import AppError from "../utils/appError";

type SchemaSet = Partial<{
  body: ZodSchema;
  query: ZodSchema;
  params: ZodSchema;
}>;

export const validate =
  (schemas: SchemaSet) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body)
        (req as any).body = await schemas.body.parseAsync(req.body);

      if (schemas.query)
        (req as any).query = await schemas.query.parseAsync(req.query);

      if (schemas.params)
        (req as any).params = await schemas.params.parseAsync(req.params);

      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return next(new AppError(fromZodError(err).message, 400));
      }
      next(err);
    }
  };
