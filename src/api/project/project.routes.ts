import { Router, Request, Response } from "express";

import { projectModel } from "../project";

const router = Router();

// Get all projects
const getProjects = async (req: Request, res: Response) => {
  const projects = await projectModel.find();

  if (projects.length === 0) {
    res.status(404).send("No projects found");
  } else {
    res.status(200).json(projects);
  }
};

export const getProjectsRouter = router.get("/api/projects", getProjects);
