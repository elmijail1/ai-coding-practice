export const ERaces = ["Terran", "Protoss", "Zerg"] as const;
export type TRace = (typeof ERaces)[number];
