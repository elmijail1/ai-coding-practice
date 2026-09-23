import { z } from "zod";
import { nonEmptyNumberValue } from "./utilities.js";

export const listUnitsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(5),
  page: z.coerce.number().int().min(1).default(1),
  race: z.enum(["Terran", "Protoss", "Zerg"]).optional(),
  mineralsMin: nonEmptyNumberValue(0),
  mineralsMax: nonEmptyNumberValue(0),
  vespeneMin: nonEmptyNumberValue(0),
  vespeneMax: nonEmptyNumberValue(0),
});

export const unitIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type ListUnitsQuery = z.infer<typeof listUnitsQuerySchema>;
