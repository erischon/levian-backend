import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";

import { authRoutes, userRoutes } from "./routes";
import { passportGoogle } from "./api/auth";
import { connectDB } from "./services";

import { projectHandlers, taskHandlers, timeLogHandlers } from "./api/project";

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

// Project routes
app.get("/api/projects", projectHandlers.getProjects);
app.get("/api/projects/:id", projectHandlers.getProjectById);
app.post("/api/projects", projectHandlers.createProject);
app.put("/api/projects/:id", projectHandlers.updateProject);
app.delete("/api/projects/:id", projectHandlers.deleteProject);

// Task routes
app.get("/api/tasks", taskHandlers.getTasks);
app.get("/api/tasks/:id", taskHandlers.getTaskById);
app.post("/api/tasks", taskHandlers.createTask);
app.put("/api/tasks/:id", taskHandlers.updateTask);
app.delete("/api/tasks/:id", taskHandlers.deleteTask);

// Time Log routes
app.get("/api/timelogs", timeLogHandlers.getTimeLogs);
app.get("/api/timelogs/:id", timeLogHandlers.getTimeLogById);
app.post("/api/timelogs", timeLogHandlers.createTimeLog);
app.put("/api/timelogs/:id", timeLogHandlers.updateTimeLog);
app.delete("/api/timelogs/:id", timeLogHandlers.deleteTimeLog);

// Launch app
app.listen(PORT, () => {
  console.log(`Server listening (on port ${PORT}).`);
});
