import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";

import { authRoutes, userRoutes, getProjectsRouter } from "./routes";
import { passportGoogle } from "./api/auth";
import { connectDB } from "./services";

const PORT: number = 3456;

// Load environment variables
dotenv.config();

// Create express app
const app: Application = express();

// Session configuration
app.use(
  session({
    secret: [process.env.SESSION_SECRET as string],
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      secure: false, // set to true if your using https
    },
  })
);

// Passport middleware
app.use(passport.session());
app.use(passport.initialize());

connectDB(); // Connect to database
passportGoogle(); // Register passport google strategy
authRoutes(app); // Register auth routes
userRoutes(app); // Register user routes

app.get("/api/projects", getProjectsRouter);

// Launch app
app.listen(PORT, () => {
  console.log(`Server listening (on port ${PORT}).`);
});
