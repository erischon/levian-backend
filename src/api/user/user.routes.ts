import { Application } from "express";

import { UserModel } from "../user";

// User Route handler
function userRoutes(app: Application) {
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await UserModel.findOne({ providerId: req.params.id });

      const currentUser = {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        providerId: user?.providerId,
        provider: user?.provider,
      };

      res.status(200).json(currentUser);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  });
}

export { userRoutes };
