import { units } from "../data/units.js";
import { HttpError } from "../errors/http-error.js";
import type { ListUnitsQuery } from "../schemas/units.js";
import type { TUnit } from "../types/unit.js";

export function findUnits({ limit }: ListUnitsQuery): TUnit[] {
  return units.slice(0, limit);
}

export function findUnitById(id: number): TUnit {
  const unit = units.find((u) => u.id === id);
  if (!unit) {
    throw new HttpError(404, "Unit not found");
  }
  return unit;
}
