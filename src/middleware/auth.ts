import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyJwtToken(req: any, res: Response, next: NextFunction) {
  const token =
    req.cookies[process.env.JWT_COOKIE_NAME!] ??
    req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.accountInfo = decoded;

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
}

export const roleAccessMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.accountInfo?.role || "";
    const hasAccess = allowedRoles.includes(userRole.toLowerCase());
    if (!hasAccess) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
};
