import { units } from "../data/units.js";
import { HttpError } from "../errors/http-error.js";
import type { ListUnitsQuery } from "../schemas/units.js";
import type { TUnit } from "../types/unit.js";

export function findUnits({
  limit,
  page,
  race,
  mineralsMin,
  mineralsMax,
  vespeneMin,
  vespeneMax,
  supplyMin,
  supplyMax,
  targets,
  type,
  typesMatchAll,
}: ListUnitsQuery): TUnit[] {
  const filtered = units.filter((unit) => {
    if (race !== undefined && !race.includes(unit.race)) return false;
    if (mineralsMin !== undefined && unit.cost.minerals < mineralsMin) return false;
    if (mineralsMax !== undefined && unit.cost.minerals > mineralsMax) return false;
    if (vespeneMin !== undefined && unit.cost.vespene < vespeneMin) return false;
    if (vespeneMax !== undefined && unit.cost.vespene > vespeneMax) return false;
    if (supplyMin !== undefined && unit.cost.supply < supplyMin) return false;
    if (supplyMax !== undefined && unit.cost.supply > supplyMax) return false;
    if (targets !== undefined && unit.targets !== targets) return false;
    if (type !== undefined) {
      const matches = typesMatchAll
        ? type.every((attribute) => unit.type.includes(attribute))
        : type.some((attribute) => unit.type.includes(attribute));
      if (!matches) return false;
    }
    return true;
  });

  const offset = (page - 1) * limit;
  return filtered.slice(offset, offset + limit);
}

export function findUnitById(id: number): TUnit {
  const unit = units.find((u) => u.id === id);
  if (!unit) {
    throw new HttpError(404, "Unit not found");
  }
  return unit;
}
