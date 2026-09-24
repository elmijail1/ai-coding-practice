export const ERaces = ["Terran", "Protoss", "Zerg"] as const;
export type TRace = (typeof ERaces)[number];

export const ESortBy = ["id", "minerals", "vespene"] as const;
export type TSortBy = (typeof ESortBy)[number];
