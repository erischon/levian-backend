import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

import passportGoogle from "./api/auth/auth.services";
import authRoutes from "./api/auth/auth.routes";

const PORT: number = 3456;

// Load environment variables
dotenv.config();

// Create express app
const app: Application = express();

// Register middlewares
authRoutes(app);
passportGoogle();

// Register a route
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur Levian !");
});

// Launch app
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
