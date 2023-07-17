import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

import { passportGoogle, authRoutes } from "./api/auth";
import { connectDB } from "./services";

const PORT: number = 3456;

// Load environment variables
dotenv.config();

// Create express app
const app: Application = express();

// Connect to database
connectDB();

// Register middlewares
authRoutes(app);
passportGoogle();

// Register a route
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur Levian !");
});

// Launch app
app.listen(PORT, () => {
  console.log(`Server listening (on port ${PORT}).`);
});
