"use client";

import {
  FieldError,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  PickSelection,
  PicksFormFields,
  PicksFormSchema,
} from "@/app/types/picks";
import { props, slates } from "@prisma/client";
import { DateInTimezone } from "@/app/(under-over)/components/DateInTimezone";
import { Button } from "@/app/components/Button";
import { validatePicks } from "./actions";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { zodResolver } from "@hookform/resolvers/zod";

export const PicksForm = ({
  slate_id,
  props,
}: {
  slate_id: slates["id"];
  props: props[];
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = useForm<PicksFormFields>({
    resolver: zodResolver(PicksFormSchema),
    defaultValues: { slate_id },
  });

  // Triggers re-render when pick inputs change.
  // We change the styling of the custom radio button when the values change
  watch(["pick"]);

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

            <p>
              Matchup:{" "}
              <span
                className={twMerge(
                  prop.players_team === prop.away_team &&
                    "text-everglade dark:text-mint",
                )}
              >
                {prop.away_team}
              </span>{" "}
              @{" "}
              <span
                className={twMerge(
                  prop.players_team === prop.home_team &&
                    "text-everglade dark:text-mint",
                )}
              >
                {prop.home_team}
              </span>
            </p>

            <div className="flex flex-row items-center space-x-2">
              <span>{prop.prop_type}: </span>
              {prop.under_value === prop.over_value ? (
                <span>{prop.under_value}</span>
              ) : (
                <div className="flex flex-row items-center space-x-2 ">
                  <span className="flex flex-row items-center">
                    <FaArrowDown />
                    {prop.under_value}
                  </span>
                  <span className="flex flex-row items-center">
                    <FaArrowUp />
                    {prop.over_value}
                  </span>
                </div>
              )}
            </div>

            {prop.game_start_time && (
              <p>
                Game Start Time: <DateInTimezone date={prop.game_start_time} />
              </p>
            )}
            <div className="p-2">
              <input
                type="hidden"
                value={prop.id}
                {...register(`pick.${index}.prop_id`)}
              />
              <label>
                <div
                  className={twMerge(
                    "border-2 border-mint",
                    getValues(`pick.${index}.selection`) === "under" &&
                      "bg-mint",
                  )}
                >
                  <p>Under</p>
                  <p>{prop.under_price}</p>
                </div>
                <input
                  type="radio"
                  className="hidden"
                  value={PickSelection.Under}
                  {...register(`pick.${index}.selection`)}
                />
              </label>
              <label>
                <div
                  className={twMerge(
                    "border-2 border-everglade",
                    getValues(`pick.${index}.selection`) === "over" &&
                      "bg-everglade",
                  )}
                >
                  <p>Over</p>
                  <p>{prop.over_price}</p>
                </div>
                <input
                  type="radio"
                  className="hidden"
                  value={PickSelection.Over}
                  {...register(`pick.${index}.selection`)}
                />
              </label>
            </div>
            {errors?.pick &&
              errors?.pick[index]?.selection?.type === "invalid_type" && (
                <p>Please select a value</p>
              )}
          </div>
        ))}
        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
};
