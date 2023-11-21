import { z } from "zod";
import { zfd } from "zod-form-data";

export enum League {
  NFL = "nfl",
  NHL = "nhl",
  MLB = "mlb",
  NBA = "nba",
}

export const AddSlateSchema = z
  .object({
    league: z.nativeEnum(League),
    nflWeek: zfd.numeric(z.number().optional()),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    isActive: z.boolean(),
    isLocked: z.boolean(),
    isComplete: z.boolean(),
  })
  .refine(
    (values) => {
      return values.startDate < values.endDate;
    },
    {
      message: "Start date must be before end date",
      path: ["endDate"],
    },
  );

export type AddSlateFormFields = z.infer<typeof AddSlateSchema>;
