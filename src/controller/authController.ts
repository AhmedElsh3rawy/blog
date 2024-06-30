import { Request, Response } from "express";
import { findUser, addUser } from "../database/queries";
import { hashPassword, comparePasswords } from "../utils/password";
import { response } from "../utils/responseHelper";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtToken";

// Register
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json(response("All fields are required", 400));
  }
  const user = await findUser(email);
  if (user) {
    return res.json(response("User already exists", 400));
  }
  const hashed = hashPassword(password);
  await addUser(username, email, hashed);
  res.status(200).json(response(`Added new user named: ${username}`, 201));
};

// Login
export const login = async (req: Request, res: Response) => {
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
  res.cookie("refreshToken", refreshToken, {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).json({ accessToken, refreshToken });
};

// Logout
export const logout = async (req: Request, res: Response) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken) return res.json(response("You are not logged in", 403));
  res.clearCookie("refreshToken", {
    httpOnly: true,
  });
  res.status(200).json(response("Logged out successfuly", 200));
};
