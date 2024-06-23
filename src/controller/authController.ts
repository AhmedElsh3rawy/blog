import { Request, Response } from "express";
import { findUser, addUser } from "../database/queries";
import { hashPassword, comparePasswords } from "../utils/password";
import { response } from "../utils/responseHelper";

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
  res.status(200).json(response("Added new user", 201));
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json(response("Username and password are required", 400));
  }
};

export const logout = async (req: Request, res: Response) => { };
