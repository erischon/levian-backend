import { Application } from "express";

// User Route handler
function userRoutes(app: Application) {
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
}

export { userRoutes };
