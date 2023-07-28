import { Application, Request, Response } from "express";

import { hoursModel } from ".";

const hoursHandlers = {
  createHours: async (req: Request, res: Response) => {
    try {
      const hours = await hoursModel.create(req.body);

      res.status(201).json(hours);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getHours: async (req: Request, res: Response) => {
    try {
      const hours = await hoursModel.find();

      res.status(200).json(hours);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getHoursById: async (req: Request, res: Response) => {
    try {
      const hours = await hoursModel.findById(req.params.id);

      // Populate
      await hours?.populate("task");

      res.status(200).json(hours);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  updateHours: async (req: Request, res: Response) => {
    try {
      const hours = await hoursModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json(hours);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  deleteHours: async (req: Request, res: Response) => {
    try {
      await hoursModel.findByIdAndDelete(req.params.id);

      res.status(200).send("Hours deleted");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
};

function hoursRoutes(app: Application) {
  app.get("/api/hours", hoursHandlers.getHours);
  app.get("/api/hours/:id", hoursHandlers.getHoursById);
  app.post("/api/hours", hoursHandlers.createHours);
  app.put("/api/hours/:id", hoursHandlers.updateHours);
  app.delete("/api/hours/:id", hoursHandlers.deleteHours);
}

export { hoursRoutes };
