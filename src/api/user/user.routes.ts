import { Application } from "express";

import { UserModel } from "../user";

// User Route handler
function userRoutes(app: Application) {
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/user/:id", async (req, res) => {
    try {
      const user = await UserModel.findOne({ providerId: req.params.id });

      res.status(200).json(user);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  });
}

export { userRoutes };
