import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, "Probet");

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }
}
