import express from "express";
import { authRouter } from "./auth";
import { roleAccessMiddleware, verifyJwtToken } from "../middleware/auth";

export const routes = express.Router();
// Auth routes
routes.use(authRouter);
