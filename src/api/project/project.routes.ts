import { Request, Response, Application } from "express";

import { projectModel } from "../project";

const projectHandlers = {
  createProject: async (req: Request, res: Response) => {
    try {
      const project = await projectModel.create(req.body);

      res.status(201).json(project);
    } catch (err: any) {
      console.log("error", err.message);
      res.status(400).send(err.message);
    }
  },
  getProjects: async (req: Request, res: Response) => {
    try {
      const projects = await projectModel.find({ user: req.params.user });

      res.status(200).json(projects);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getProjectById: async (req: Request, res: Response) => {
    try {
      const project = await projectModel.findById({
        _id: req.params.id,
      });

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

function projectRoutes(app: Application) {
  app.get("/api/projects/:user", projectHandlers.getProjects);
  app.get("/api/projects/project/:id", projectHandlers.getProjectById);
  app.post("/api/projects", projectHandlers.createProject);
  app.put("/api/projects/:id", projectHandlers.updateProject);
  app.delete("/api/projects/:id", projectHandlers.deleteProject);
}

export { projectRoutes };
