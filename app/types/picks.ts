import { z } from "zod";
import { PropResult } from "./props";

export enum PickSelection {
  Under = "under",
  Over = "over",
}
export enum PickResult {
  Win = "win",
  Lose = "lose",
  Push = "push",
}

export const PicksFormSchema = z.object({
  slate_id: z.coerce.number(),
  pick: z.array(
    z.object({
      prop_id: z.coerce.number(),
      selection: z.nativeEnum(PropResult), // We'll never use "active"
    }),
  ),
});

export type PicksFormFields = z.infer<typeof PicksFormSchema>;
