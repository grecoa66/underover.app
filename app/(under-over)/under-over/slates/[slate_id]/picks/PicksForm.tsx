"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  PickSelection,
  PicksFormFields,
  PicksFormSchema,
} from "@/app/types/picks";
import { props, slates } from "@prisma/client";
import { DateInTimezone } from "@/app/(under-over)/components/DateInTimezone";
import { Button } from "@/app/components/Button";
import { createPicks } from "./actions";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { zodResolver } from "@hookform/resolvers/zod";
import useDynamicRefs from "@/app/hooks/useDynamicRefs";
import { RefObject } from "react";

export const PicksForm = ({
  slate_id,
  props,
}: {
  slate_id: slates["id"];
  props: props[];
}) => {
  // When we create "bet" elements, we need to create a new ref
  const [getRef, setRef] = useDynamicRefs<HTMLDivElement>();

  const {
    watch,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<PicksFormFields>({
    resolver: zodResolver(PicksFormSchema),
    defaultValues: { slate_id },
  });

  // Triggers re-render when pick inputs change.
  // We change the styling of the custom radio button when the values change.
  watch(["picks"]);

  const scrollNextBetIntoView = (index: number) => {
    setTimeout(() => {
      if (index + 1 < props.length) {
        getRef(String(props[index + 1].id))?.current?.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      } else {
        getRef("picks-form-submit-button")?.current?.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    }, 750);
  };

  const onSubmit: SubmitHandler<PicksFormFields> = (data) => {
    console.log("Picks: ", createPicks(data));
  };

  // TODO: i think it would cool to disable scrolling on this page. Scrolling should only be controlled by clicking buttons.

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("slate_id")} />
        {props.map((prop, index) => (
          <div
            key={prop.id}
            id={String(prop.id)}
            // We'll use these refs to scroll the next bet into view
            ref={setRef(String(prop.id)) as RefObject<HTMLDivElement>}
            className="flex h-screen scroll-mt-20 flex-col border-2 border-black dark:border-white"
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
                {...register(`picks.${index}.prop_id`)}
              />
              <label>
                <div
                  className={twMerge(
                    "border-2 border-everglade",
                    getValues(`picks.${index}.selection`) === "over" &&
                      "bg-everglade",
                  )}
                  onClick={() => scrollNextBetIntoView(index)}
                >
                  <p>Over</p>
                  <p>{prop.over_price}</p>
                </div>
                <input
                  type="radio"
                  className="hidden"
                  value={PickSelection.Over}
                  {...register(`picks.${index}.selection`)}
                />
              </label>
              <label>
                <div
                  className={twMerge(
                    "border-2 border-mint",
                    getValues(`picks.${index}.selection`) === "under" &&
                      "bg-mint",
                  )}
                  onClick={() => scrollNextBetIntoView(index)}
                >
                  <p>Under</p>
                  <p>{prop.under_price}</p>
                </div>
                <input
                  type="radio"
                  className="hidden"
                  value={PickSelection.Under}
                  {...register(`picks.${index}.selection`)}
                />
              </label>
            </div>
            {/* TODO: How should we display these errors if someone scrolls past the pick without clicking on one? */}
            {errors?.picks &&
              errors?.picks[index]?.selection?.type === "invalid_type" && (
                <p>Please select a value</p>
              )}
          </div>
        ))}
        <div
          id="picks-form-submit-button"
          ref={setRef("picks-form-submit-button") as RefObject<HTMLDivElement>}
          className="flex h-screen items-center justify-center"
        >
          <Button type="submit" text="Submit" />
        </div>
      </form>
    </div>
  );
};
