import { units } from "../data/units.js";
import { HttpError } from "../errors/http-error.js";
import type { ListUnitsQuery } from "../schemas/units.js";
import type { TSortBy } from "../types/general.js";
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
  sortBy,
  orderBy,
  search,
}: ListUnitsQuery): TUnit[] {
  const filtered = units.filter((unit) => {
    if (race !== undefined && !race.includes(unit.race)) return false;
    if (mineralsMin !== undefined && unit.cost.minerals < mineralsMin)
      return false;
    if (mineralsMax !== undefined && unit.cost.minerals > mineralsMax)
      return false;
    if (vespeneMin !== undefined && unit.cost.vespene < vespeneMin)
      return false;
    if (vespeneMax !== undefined && unit.cost.vespene > vespeneMax)
      return false;
    if (supplyMin !== undefined && unit.cost.supply < supplyMin) return false;
    if (supplyMax !== undefined && unit.cost.supply > supplyMax) return false;
    if (targets !== undefined && unit.targets !== targets) return false;
    if (type !== undefined) {
      const matches = typesMatchAll
        ? type.every((attribute) => unit.type.includes(attribute))
        : type.some((attribute) => unit.type.includes(attribute));
      if (!matches) return false;
    }
    if (
      search !== undefined &&
      !unit.name.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const sortValueGetters: Record<TSortBy, (unit: TUnit) => number> = {
    id: (unit) => unit.id,
    minerals: (unit) => unit.cost.minerals,
    vespene: (unit) => unit.cost.vespene,
  };
  const getSortValue = sortValueGetters[sortBy ?? "id"];

  const order = orderBy === "ascending" ? 1 : -1;
  const searchLower = search?.toLowerCase();
  const getStartsWithSearchRank = (unit: TUnit) =>
    searchLower !== undefined && unit.name.toLowerCase().startsWith(searchLower)
      ? 0
      : 1;

  const sorted = filtered.sort((a, b) => {
    if (search === undefined) {
      return (getSortValue(a) - getSortValue(b)) * order;
    }
    if (sortBy === undefined) {
      const searchRankDiff =
        getStartsWithSearchRank(a) - getStartsWithSearchRank(b);
      return searchRankDiff !== 0
        ? searchRankDiff
        : (getSortValue(a) - getSortValue(b)) * order;
    }
    const sortValueDiff = (getSortValue(a) - getSortValue(b)) * order;
    return sortValueDiff !== 0
      ? sortValueDiff
      : getStartsWithSearchRank(a) - getStartsWithSearchRank(b);
  });

  const offset = (page - 1) * limit;
  return sorted.slice(offset, offset + limit);
}

export function findUnitById(id: number): TUnit {
  const unit = units.find((u) => u.id === id);
  if (!unit) {
    throw new HttpError(404, "Unit not found");
  }
  return unit;
}
