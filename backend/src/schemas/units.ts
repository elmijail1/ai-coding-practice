import { z } from "zod";
import { ERaces, ESortBy } from "../types/general.js";
import { EUnitAttributes } from "../types/unit.js";
import { multiValueEnum, nonEmptyNumberValue } from "./utilities.js";

export const listUnitsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(5),
  page: z.coerce.number().int().min(1).default(1),
  race: multiValueEnum(ERaces),
  mineralsMin: nonEmptyNumberValue(0),
  mineralsMax: nonEmptyNumberValue(0),
  vespeneMin: nonEmptyNumberValue(0),
  vespeneMax: nonEmptyNumberValue(0),
  supplyMin: nonEmptyNumberValue(0),
  supplyMax: nonEmptyNumberValue(0),
  targets: z.enum(["ground", "air", "ground and air", "none"]).optional(),
  type: multiValueEnum(EUnitAttributes),
  typesMatchAll: z.preprocess(
    (val) => (val === "" ? "true" : val),
    z.stringbool().default(false),
  ),
  sortBy: z.enum(ESortBy).optional(),
  orderBy: z.enum(["ascending", "descending"]).default("ascending"),
  search: z
    .preprocess(
      (v) => (typeof v === "string" ? v.trim() : v),
      z.string().max(20).optional(),
    )
    .transform((v) => (v === undefined || v.length === 0 ? undefined : v)),
});

export const unitIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type ListUnitsQuery = z.infer<typeof listUnitsQuerySchema>;
