import { Application, Request, Response } from "express";

import { taskModel } from ".";

const taskHandlers = {
  createTask: async (req: Request, res: Response) => {
    try {
      const task = await taskModel.create(req.body);

      res.status(201).json(task);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getTasks: async (req: Request, res: Response) => {
    try {
      const tasks = await taskModel.find();

      res.status(200).json(tasks);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getTaskById: async (req: Request, res: Response) => {
    try {
      const task = await taskModel.findById(req.params.id);

      // Populate
      await task?.populate("project");
      await task?.populate("user");

      res.status(200).json(task);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  updateTask: async (req: Request, res: Response) => {
    try {
      const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json(task);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  deleteTask: async (req: Request, res: Response) => {
    try {
      await taskModel.findByIdAndDelete(req.params.id);

      res.status(200).send("Task deleted");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getTasksByProjectId: async (req: Request, res: Response) => {
    try {
      const tasks = await taskModel
        .find({ project: req.params.id })
        .populate("user");

      res.status(200).json(tasks);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
};

const taskRoutes = (app: Application) => {
  app.get("/api/tasks", taskHandlers.getTasks);
  app.get("/api/tasks/:id", taskHandlers.getTaskById);
  app.post("/api/tasks", taskHandlers.createTask);
  app.put("/api/tasks/:id", taskHandlers.updateTask);
  app.delete("/api/tasks/:id", taskHandlers.deleteTask);
  app.get("/api/tasks/project/:id", taskHandlers.getTasksByProjectId);
};

export { taskRoutes };
