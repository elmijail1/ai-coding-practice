import { z } from 'zod';

export const listUnitsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(5),
});

export type ListUnitsQuery = z.infer<typeof listUnitsQuerySchema>;
