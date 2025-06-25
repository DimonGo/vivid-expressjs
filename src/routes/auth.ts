import { Router } from "express";
import { verifyJwtToken } from "../middleware/auth";
import {
  getUserAccountData,
  signinUser,
  signOutUser,
  signupUser,
} from "../controllers/authControllers";

export const authRouter = Router();

authRouter.post("/api/auth/signup", signupUser);
authRouter.post("/api/auth/signin", signinUser);
authRouter.post("/api/auth/signout", verifyJwtToken, signOutUser);

authRouter.get("/api/users/me", verifyJwtToken, getUserAccountData);
