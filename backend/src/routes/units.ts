import { Router } from "express";
import { listUnitsQuerySchema, unitIdParamsSchema } from "../schemas/units.js";
import { findUnitById, findUnits } from "../services/units.js";

export const unitsRouter = Router();

unitsRouter.get("/", (req, res) => {
  const query = listUnitsQuerySchema.parse(req.query);
  res.json(findUnits(query));
});

unitsRouter.get("/:id", (req, res) => {
  const { id } = unitIdParamsSchema.parse(req.params);
  res.json(findUnitById(id));
});
