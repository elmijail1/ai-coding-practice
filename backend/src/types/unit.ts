export type Unit = {
  id: number;
  name: string;
  race: "Terran" | "Protoss" | "Zerg";
  basicHp: number;
  basicDamage: number;
  cost: { minerals: number; vespene: number; supply: number };
  productionHotkey: string;
  targets: "ground" | "air" | "ground and air";
};
