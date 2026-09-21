import express from "express";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { unitsRouter } from "./routes/units.js";

const app = express();
const port = process.env.PORT ?? 3000;

function getHttpStatus(err: unknown): number {
  if (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    typeof err.status === "number" &&
    err.status >= 400 &&
    err.status < 600
  ) {
    return err.status;
  }
  return 500;
}

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("OK");
});

app.use("/units", unitsRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Invalid request", issues: err.issues });
    return;
  }
  const status = getHttpStatus(err);
  if (status >= 500) {
    console.error(err);
    res.status(status).json({ error: "Internal server error" });
    return;
  }
  res
    .status(status)
    .json({ error: err instanceof Error ? err.message : "Bad request" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
