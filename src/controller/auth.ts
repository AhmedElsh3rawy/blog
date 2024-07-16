import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { findUser, addUser, addToken, deleteToken } from "../database/queries";
import { hashPassword, comparePasswords } from "../utils/password";
import { response } from "../utils/responseHelper";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtToken";
import AppError from "../utils/appError";

// Register
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  },
);

// Login
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }
    const user = await findUser(email);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const match = comparePasswords(user.password, password);
    if (!match) {
      return next(new AppError("Invalid email or password", 400));
    }
    const accessToken = await generateAccessToken(user.id);
    const refreshToken = await generateRefreshToken(user.id);

    await addToken(refreshToken, user.id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ accessToken });
  },
);

// Logout
export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req?.cookies?.refreshToken;
    if (!refreshToken) return next(new AppError("You are not logged in", 403));
    await deleteToken(+req.body.id);
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });
    res.sendStatus(204);
  },
);
