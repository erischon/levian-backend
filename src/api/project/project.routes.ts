import { Router, Request, Response } from "express";

import { projectModel } from "../project";

const router = Router();

// Create a new project
const createProject = async (req: Request, res: Response) => {
  try {
    const project = await projectModel.create(req.body);

    res.status(201).json(project);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

// Get all projects
const getProjects = async (req: Request, res: Response) => {
  const projects = await projectModel.find();

  if (projects.length === 0) {
    res.status(404).send("No projects found");
  } else {
    res.status(200).json(projects);
  }
};

// Get a project by id
const getProjectById = async (req: Request, res: Response) => {
  const project = await projectModel.findById(req.params.id);

  if (!project) {
    res.status(404).send("No project found");
  } else {
    res.status(200).json(project);
  }
};

// Update a project

// Delete a project

// Get all tasks for a project

// Get a task by id

// Create a new task

// Update a task

// Delete a task

// Get all time logs for a task

// Get a time log by id

// Create a new time log

// Update a time log

// Delete a time log

export const createProjectRouter = router.post("/api/projects", createProject);
export const getProjectsRouter = router.get("/api/projects", getProjects);
export const getProjectByIdRouter = router.get(
  "/api/projects/:id",
  getProjectById
);
