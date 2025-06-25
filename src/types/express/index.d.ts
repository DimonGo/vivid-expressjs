import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      accountInfo?: { userId?: string; role?: string } & JwtPayload;
    }
  }
}
