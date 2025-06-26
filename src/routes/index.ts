import express from "express";
import { authRouter } from "./auth";
import { roleAccessMiddleware, verifyJwtToken } from "../middleware/auth";
import { projectsRouter } from "./projects";

export const routes = express.Router();
// Auth routes
routes.use(authRouter);

// Project routes
routes.use(
  "/projects",
  [verifyJwtToken, roleAccessMiddleware(["tenant"])],
  projectsRouter,
);
