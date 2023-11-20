import { z } from "zod";

export enum League {
  NFL = "nfl",
  NHL = "nhl",
  MLB = "mlb",
  NBA = "nba",
}

export const AddSlateSchema = z
  .object({
    league: z.nativeEnum(League),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
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
