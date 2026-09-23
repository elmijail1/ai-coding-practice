import { z } from 'zod';

export const listUnitsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(5),
  page: z.coerce.number().int().min(1).default(1),
});

export const unitIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type ListUnitsQuery = z.infer<typeof listUnitsQuerySchema>;
