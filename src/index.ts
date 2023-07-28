import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";

import {
  authRoutes,
  userRoutes,
  customerRoutes,
  projectRoutes,
  taskRoutes,
  hoursRoutes,
} from "./routes";
import { passportGoogle } from "./api/auth";
import { connectDB } from "./services";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3456;

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

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://levian-backend-ffde6465a95f.herokuapp.com",
      "https://levian-frontend.vercel.app",
    ],
  })
);

connectDB(); // Connect to database
passportGoogle(); // Register passport google strategy
authRoutes(app); // Register auth routes
userRoutes(app); // Register user routes
customerRoutes(app); // Register customer routes
projectRoutes(app); // Register project routes
taskRoutes(app); // Register task routes
hoursRoutes(app); // Register hours routes

// Launch app
app.listen(PORT, () => {
  console.log(`Server listening (on port ${PORT}).`);
});
