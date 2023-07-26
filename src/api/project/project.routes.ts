import { Request, Response, Application } from "express";

import { projectModel, taskModel, timeLogModel } from "../project";

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
    try {
      const projects = await projectModel.find();

      res.status(200).json(projects);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getProjectById: async (req: Request, res: Response) => {
    try {
      const project = await projectModel.findById(req.params.id);

      // Populate
      await project?.populate("customer");
      await project?.populate("user");

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

const timeLogHandlers = {
  createTimeLog: async (req: Request, res: Response) => {
    try {
      const timeLog = await timeLogModel.create(req.body);

      res.status(201).json(timeLog);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getTimeLogs: async (req: Request, res: Response) => {
    try {
      const timeLogs = await timeLogModel.find();

      res.status(200).json(timeLogs);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getTimeLogById: async (req: Request, res: Response) => {
    try {
      const timeLog = await timeLogModel.findById(req.params.id);

      // Populate
      await timeLog?.populate("task");

      res.status(200).json(timeLog);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  updateTimeLog: async (req: Request, res: Response) => {
    try {
      const timeLog = await timeLogModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json(timeLog);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  deleteTimeLog: async (req: Request, res: Response) => {
    try {
      await timeLogModel.findByIdAndDelete(req.params.id);

      res.status(200).send("Time log deleted");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
};

export { projectHandlers, taskHandlers, timeLogHandlers };
