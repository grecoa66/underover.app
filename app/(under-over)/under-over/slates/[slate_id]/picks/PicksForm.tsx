"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { PickSelection, PicksFormFields } from "@/app/types/picks";
import { props, slates } from "@prisma/client";
import { DateInTimezone } from "@/app/(under-over)/components/DateInTimezone";
import { Button } from "@/app/components/Button";
import { validatePicks } from "./actions";

export const PicksForm = ({
  slate_id,
  props,
}: {
  slate_id: slates["id"];
  props: props[];
}) => {
  const { register, handleSubmit } = useForm<PicksFormFields>({
    defaultValues: { slate_id },
  });

  const onSubmit: SubmitHandler<PicksFormFields> = (data) => {
    validatePicks(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("slate_id")} />
        {props.map((prop, index) => (
          <div
            key={prop.id}
            className="flex flex-col border-2 border-black dark:border-white"
          >
            {prop.player_name && <p>Player: {prop.player_name}</p>}
            {prop.players_team && <p>Team: {prop.players_team}</p>}
            <p>
              Matchup: {prop.away_team} @ {prop.home_team}
            </p>
            {prop.game_start_time && (
              <p>
                Game Start Time: <DateInTimezone date={prop.game_start_time} />
              </p>
            )}
            <div>
              <input
                type="hidden"
                value={prop.id}
                {...register(`pick.${index}.prop_id`)}
              />
              <label>
                Under{" "}
                <input
                  type="radio"
                  value={PickSelection.Under}
                  {...register(`pick.${index}.selection`)}
                />
              </label>
              <label>
                Over{" "}
                <input
                  type="radio"
                  value={PickSelection.Over}
                  {...register(`pick.${index}.selection`)}
                />
              </label>
            </div>
          </div>
        ))}
        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
};
