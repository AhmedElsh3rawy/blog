import { Request, Response, NextFunction } from "express";
import { findUser, addUser, addToken, deleteToken } from "../database/queries";
import { hashPassword, comparePasswords } from "../utils/password";
import { response } from "../utils/responseHelper";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtToken";
import AppError from "../utils/appError";

// Register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }
  const user = await findUser(email);
  if (user) {
    return next(new AppError("User already exists", 400));
  }
  const hashed = hashPassword(password);
  await addUser(username, email, hashed);
  res.status(200).json(response(`Added new user named: ${username}`, 201));
};

// Login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json(response("Email and password are required", 400));
  }
  const user = await findUser(email);
  if (!user) {
    return res.json(response("You are not registered", 400));
  }
  const match = comparePasswords(user.password, password);
  if (!match) {
    return res.json(response("Invalid email or password", 400));
  }
  const accessToken = await generateAccessToken(user.id);
  const refreshToken = await generateRefreshToken(user.id);

  await addToken(refreshToken, user.id);

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).json({ accessToken });
};

// Logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken) return next(new AppError("You are not logged in", 403));
  await deleteToken(+req.body.id);
  res.clearCookie("refreshToken", {
    httpOnly: true,
  });
  res.sendStatus(204);
};
