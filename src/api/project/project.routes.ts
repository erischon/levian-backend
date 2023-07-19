import { Request, Response } from "express";

import { projectModel, taskModel } from "../project";

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

const taskHandlers = {
  createTask: async (req: Request, res: Response) => {
    try {
      const task = await taskModel.create(req.body);

      res.status(201).json(task);
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

export { projectHandlers, taskHandlers };
