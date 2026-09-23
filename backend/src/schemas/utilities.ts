import { z } from "zod";

export function nonEmptyNumberValue(min: number) {
  return z
    .string()
    .trim()
    .min(1, "Value cannot be 0-character long")
    .max(8, "Value is too long")
    .transform((val, ctx) => {
      const num = Number(val);
      if (Number.isNaN(num)) {
        ctx.addIssue({ code: "custom", message: "Invalid number" });
        return z.NEVER;
      }
      if (num < min) {
        ctx.addIssue({ code: "custom", message: `Number must be >= ${min}` });
        return z.NEVER;
      }
      if (!Number.isInteger(num) && !Number.isInteger(num * 2)) {
        ctx.addIssue({ code: "custom", message: "Only increments of 0.5 are allowed" });
        return z.NEVER;
      }
      return num;
    })
    .optional();
}
