import { Router } from "express";
import { verifyJwtToken } from "../middleware/auth";
import {
  getUserAccountData,
  signinUser,
  signOutUser,
  signupUser,
} from "../controllers/authControllers";

export const authRouter = Router();

authRouter.post("/auth/signup", signupUser);
authRouter.post("/auth/signin", signinUser);
authRouter.post("/auth/signout", verifyJwtToken, signOutUser);

authRouter.get("/users/me", verifyJwtToken, getUserAccountData);
