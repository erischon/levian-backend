import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";

import {
  authRoutes,
  userRoutes,
  getProjectsRouter,
  getProjectByIdRouter,
  createProjectRouter,
  updateProjectRouter,
  deleteProjectRouter,
} from "./routes";
import { passportGoogle } from "./api/auth";
import { connectDB } from "./services";

import { projectHandlers } from "./api/project/project.routes";

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
app.use(bodyParser.json());
app.use(passport.session());
app.use(passport.initialize());

connectDB(); // Connect to database
passportGoogle(); // Register passport google strategy
authRoutes(app); // Register auth routes
userRoutes(app); // Register user routes

app.post("/api/projects", projectHandlers.createProject);
app.put("/api/projects/:id", updateProjectRouter);
app.delete("/api/projects/:id", deleteProjectRouter);

app.get("/api/projects", getProjectsRouter);
app.get("/api/projects/:id", getProjectByIdRouter);

// Launch app
app.listen(PORT, () => {
  console.log(`Server listening (on port ${PORT}).`);
});
