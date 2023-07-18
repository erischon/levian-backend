import { Application } from "express";

// User Route handler
function userRoutes(app: Application) {
  // GET /api/current_user
  // Get the current user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
}

export { userRoutes };
