import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../interfaces/auth.interface";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;

    if (!decoded || !decoded.id || !decoded.email) {
      return res.status(401).json({ message: "Token inválido" });
    }

    (req as any).user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
