import express, { Application, Request, Response } from "express";

const PORT: number = 3000;

// Create express app
const app: Application = express();

// Register a route
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur Levian !");
});

// Launch app
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
