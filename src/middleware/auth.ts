import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { response } from "../utils/responseHelper";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

class AuthorizationRequest extends Request {
  user?: User;
}

export function authenticateToken(
  req: AuthorizationRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json(response("Unauthoraized access", 401));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.status(403).json(response("Forbidden", 403));
    req.user = user as User;
    next();
  });
}
