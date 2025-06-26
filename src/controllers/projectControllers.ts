import { db } from "../lib/prisma";
import { Request, Response } from "express";

export const getAllProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { limit } = req.query;

  try {
    const projects = await db.project.findMany({
      where: {
        userId: req?.accountInfo?.userId,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      ...(limit ? { take: Number(limit) } : {}),
    });

    if (projects && projects?.length && projects?.length > 0) {
      res.json(projects);
    } else {
      res.status(404).json({ message: "No projects found" });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving projects: ${(error as Error)?.message}`,
    });
  }
};
