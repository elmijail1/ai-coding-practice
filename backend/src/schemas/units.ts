import { z } from "zod";
import { ERaces } from "../types/general.js";
import { nonEmptyNumberValue } from "./utilities.js";

export const listUnitsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(5),
  page: z.coerce.number().int().min(1).default(1),
  race: z
    .union([z.enum(ERaces), z.array(z.enum(ERaces))])
    .optional()
    .transform((val) => (val === undefined || Array.isArray(val) ? val : [val])),
  mineralsMin: nonEmptyNumberValue(0),
  mineralsMax: nonEmptyNumberValue(0),
  vespeneMin: nonEmptyNumberValue(0),
  vespeneMax: nonEmptyNumberValue(0),
  supplyMin: nonEmptyNumberValue(0),
  supplyMax: nonEmptyNumberValue(0),
  targets: z.enum(["ground", "air", "ground and air", "none"]).optional(),
});

export const unitIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type ListUnitsQuery = z.infer<typeof listUnitsQuerySchema>;
