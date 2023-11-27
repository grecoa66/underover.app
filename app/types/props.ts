import { z } from "zod";
import { zfd } from "zod-form-data";
import { League } from "./slates";

export const AddPropFormSchema = z
  .object({
    league: z.nativeEnum(League),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    player_name: z.string().optional(),
    team_name: z.string().optional(),
    team_matchup: z.string(),
    game_start_time: z.coerce.date(), // Probably not correct. DB expects a timestamp
    prop_type: z.string(), // TODO: make an enum for these values
    prop_result: z.union([
      z.literal("under"),
      z.literal("over"),
      z.literal("push"),
      z.literal("active"),
    ]),
    under_value: z.coerce.number(),
    under_price: z.coerce.number(),
    over_value: z.coerce.number(),
    over_price: z.coerce.number(),
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

export type AddPropFormFields = z.infer<typeof AddPropFormSchema>;
