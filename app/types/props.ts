import { z } from "zod";
import { League } from "./slates";

export enum PropResult {
  Under = "under",
  Over = "over",
  Push = "push",
  Active = "active",
}

export const isValuePropResult = (value: string): value is PropResult => {
  return (<any>Object).values(PropResult).includes(value);
};

export const AddPropFormSchema = z
  .object({
    league: z.nativeEnum(League),
    start_date: z.coerce.date(),
    end_date: z.optional(z.coerce.date()),
    player_name: z.string().optional(),
    players_team: z.string().optional(),
    home_team: z.string().min(1),
    away_team: z.string().min(1),
    game_start_time: z.coerce.date(), // Probably not correct. DB expects a timestamp
    prop_type: z.string().min(1), // TODO: make an enum for these values
    prop_result: z.nativeEnum(PropResult),
    over_value: z.coerce.number(),
    over_price: z.coerce.number(),
    under_value: z.coerce.number().optional(),
    under_price: z.coerce.number(),
    slate_id: z.coerce.number(),
  })
  .refine(
    (values) => {
      if (values.end_date) {
        return values.start_date <= values.end_date;
      }
    },
    {
      message: "Start date must be before end date",
      path: ["end_date"],
    },
  )
  .refine(
    (values) => {
      return (
        values.players_team === values.home_team ||
        values.players_team === values.away_team
      );
    },
    {
      message: "Player's team must match home or away team",
      path: ["players_team"],
    },
  );

export type AddPropFormFields = z.infer<typeof AddPropFormSchema>;

export const EditPropFormSchema = z
  .object({
    id: z.coerce.number(),
    league: z.nativeEnum(League),
    start_date: z.string(),
    end_date: z.string().optional(),
    player_name: z.string().optional(),
    players_team: z.string().optional(),
    home_team: z.string().min(1),
    away_team: z.string().min(1),
    timezone: z.string(),
    game_start_time: z.string(), // Probably not correct. DB expects a timestamp
    prop_type: z.string().min(1), // TODO: make an enum for these values
    prop_result: z.nativeEnum(PropResult),
    over_value: z.coerce.number(),
    over_price: z.coerce.number(),
    under_value: z.coerce.number().optional(),
    under_price: z.coerce.number(),
    slate_id: z.coerce.number(),
  })
  .refine(
    (values) => {
      if (values.end_date) {
        return values.start_date <= values.end_date;
      }
    },
    {
      message: "Start date must be before end date",
      path: ["end_date"],
    },
  )
  .refine(
    (values) => {
      return (
        values.players_team === values.home_team ||
        values.players_team === values.away_team
      );
    },
    {
      message: "Player's team must match home or away team",
      path: ["players_team"],
    },
  );

export type EditPropFormFields = z.infer<typeof EditPropFormSchema>;

export const DeletePropSchema = z.object({
  id: z.coerce.number(),
  slate_id: z.coerce.number(),
});

export type DeletePropData = z.infer<typeof DeletePropSchema>;
