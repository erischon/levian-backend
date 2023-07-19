import { Router, Request, Response } from "express";

import { projectModel } from "../project";

const router = Router();

const projectHandlers = {
  createProject: async (req: Request, res: Response) => {
    try {
      const project = await projectModel.create(req.body);

      res.status(201).json(project);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getProjects: async (req: Request, res: Response) => {
    const projects = await projectModel.find();

    if (projects.length === 0) {
      res.status(404).send("No projects found");
    } else {
      res.status(200).json(projects);
    }
  },
  getProjectById: async (req: Request, res: Response) => {
    try {
      const project = await projectModel.findById(req.params.id);

      res.status(200).json(project);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  updateProject: async (req: Request, res: Response) => {
    try {
      const project = await projectModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json(project);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  deleteProject: async (req: Request, res: Response) => {
    try {
      await projectModel.findByIdAndDelete(req.params.id);

      res.status(200).send("Project deleted");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
};

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

export { projectHandlers };

export const createProjectRouter = router.post(
  "/api/projects",
  projectHandlers.createProject
);
export const updateProjectRouter = router.put(
  "/api/projects/:id",
  projectHandlers.updateProject
);
export const deleteProjectRouter = router.delete(
  "/api/projects/:id",
  projectHandlers.deleteProject
);
export const getProjectsRouter = router.get(
  "/api/projects",
  projectHandlers.getProjects
);
export const getProjectByIdRouter = router.get(
  "/api/projects/:id",
  projectHandlers.getProjectById
);
