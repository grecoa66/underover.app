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
    nfl_week: zfd.numeric(z.number().optional()),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    is_active: z.boolean(),
    is_locked: z.boolean(),
    is_complete: z.boolean(),
  })
  .refine(
    (values) => {
      return values.start_date < values.end_date;
    },
    {
      message: "Start date must be before end date",
      path: ["endDate"],
    },
  );

export type AddSlateFormFields = z.infer<typeof AddSlateSchema>;
