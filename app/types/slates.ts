import { z } from "zod";
import { zfd } from "zod-form-data";

export enum League {
  NFL = "nfl",
  NHL = "nhl",
  MLB = "mlb",
  NBA = "nba",
}

export const SlateFormSchema = z
  .object({
    league: z.nativeEnum(League),
    nfl_week: zfd.numeric(z.number().optional()),
    start_date: z.string(),
    end_date: z.string(),
    is_active: z.boolean(),
    is_locked: z.boolean(),
    is_complete: z.boolean(),
  })
  .refine(
    (values) => {
      return new Date(values.start_date) < new Date(values.end_date);
    },
    {
      message: "Start date must be before end date",
      path: ["end_date"],
    },
  );

export type SlateFormFields = z.infer<typeof SlateFormSchema>;
