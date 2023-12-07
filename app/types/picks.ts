import { picks, props, users } from "@prisma/client";
import { z } from "zod";

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
  picks: z.array(
    z.object({
      prop_id: z.coerce.number(),
      selection: z.nativeEnum(PickSelection), // We'll never use "active"
    }),
  ),
});

export type PicksFormFields = z.infer<typeof PicksFormSchema>;

export type LeaderboardResult = {
  user_id: string;
  picks: ({
    props: props;
    users: users;
  } & picks)[];
  record: { wins: number; losses: number; active: number };
};
