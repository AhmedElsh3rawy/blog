import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";

const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => { },
);

const modifyPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => { },
);

const removePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => { },
);
