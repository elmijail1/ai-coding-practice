const ATTRIBUTES = [
  "air",
  "armored",
  "biological",
  "detector",
  "ground",
  "heroic",
  "light",
  "massive",
  "mechanical",
  "melee",
  "psionic",
  "ranged",
  "structure",
  "summoned",
] as const;
type TUnitAttribute = (typeof ATTRIBUTES)[number];

export type TUnit = {
  id: number;
  name: string;
  race: "Terran" | "Protoss" | "Zerg";
  basicHp: number;
  basicDamage: number;
  cost: { minerals: number; vespene: number; supply: number };
  productionHotkey: string;
  targets: "ground" | "air" | "ground and air" | "none";
  type: TUnitAttribute[];
};
