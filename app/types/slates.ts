import { z } from "zod";
import { zfd } from "zod-form-data";

export enum League {
  NFL = "nfl",
  NHL = "nhl",
  MLB = "mlb",
  NBA = "nba",
}

export const AddSlateFormSchema = z
  .object({
    league: z.nativeEnum(League),
    nfl_week: zfd.numeric(z.number().optional()),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    is_active: z.boolean(),
  })
  .refine(
    (values) => {
      return values.start_date <= values.end_date;
    },
    {
      message: "Start date must be before end date",
      path: ["end_date"],
    },
  );

export type AddSlateFormFields = z.infer<typeof AddSlateFormSchema>;

/**
 * The form that uses this schema is expecting dates as formatted strings.
 * The form resolver types must match the default values, so the date types
 * are strings so they match the input of the form inputs.
 */
export const EditSlateFormSchema = z
  .object({
    id: z.coerce.number(),
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
      return new Date(values.start_date) <= new Date(values.end_date);
    },
    {
      message: "Start date must be before end date",
      path: ["end_date"],
    },
  );

export type EditSlateFormFields = z.infer<typeof EditSlateFormSchema>;

// DELETE
export const DeleteSlateSchema = z.object({
  id: z.coerce.number(),
  is_active: z.boolean(),
});

export type DeleteSlateData = z.infer<typeof DeleteSlateSchema>;
