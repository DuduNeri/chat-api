import { Request } from "express";

export interface JwtPayload {
  id: string;
  email: string;
  password: string
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}