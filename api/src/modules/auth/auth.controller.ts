import { CreateUserDto } from "../users/dto/create-user.dto";
import { authService } from "./auth.service";
import type { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const dto = req.body as CreateUserDto;
  const user = await authService.register(dto);
  res.status(200).json(user);
};
