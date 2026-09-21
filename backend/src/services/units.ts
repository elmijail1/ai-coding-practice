import { units } from '../data/units.js';
import type { ListUnitsQuery } from '../schemas/units.js';
import type { Unit } from '../types/unit.js';

export function findUnits({ limit }: ListUnitsQuery): Unit[] {
  return units.slice(0, limit);
}
