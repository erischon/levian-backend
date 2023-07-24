import { Application } from "express";
import passport from "passport";

import { UserModel } from "../user";

// Route handler for authenticating
function authRoutes(app: Application) {
  // Create a route handler for authenticating with Google
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["openid", "profile", "email"],
    })
  );

  // Create a route handler for the Google callback
  app.get("/auth/google/callback", passport.authenticate("google"));

  // POST /auth/signin
  // Route handler for signing in
  app.post("/auth/signin", async (req, res) => {
    try {
      const { name, providerId, email, image, provider } = req.body;

      // Check if all fields are present
      if (!name || !providerId || !email || !image || !provider) {
        return res.status(400).json({ message: "Missing fields" });
      }

      // Check if user exists
      const user = await UserModel.findOne({ providerId });

      // If user does not exist, create user
      if (!user) {
        const newUser = await UserModel.create({
          name,
          providerId,
          email,
          image,
          provider,
        });
      }

      // Get user id
      const userId = await UserModel.findOne({ providerId }).select("_id");

      // Send response
      res.status(200).json({ userId });
    } catch (error) {
      console.log(error);
    }
  });
}

export default authRoutes;
