import { Application } from "express";
import passport from "passport";

// Route handler for authenticating
function authRoutes(app: Application) {
  // Create a route handler for authenticating with Google
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // Create a route handler for the Google callback
  app.get("/auth/google/callback", passport.authenticate("google"));
}

export default authRoutes;
