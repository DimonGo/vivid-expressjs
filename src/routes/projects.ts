import { Router } from "express";
import { getAllProjects } from "../controllers/projectControllers";

export const projectsRouter = Router();

projectsRouter.get("/", getAllProjects);
