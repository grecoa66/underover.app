"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  PickSelection,
  PicksFormFields,
  PicksFormSchema,
} from "@/app/types/picks";
import { props, slates } from "@prisma/client";
import { DayAndMonthInTimezone } from "@/app/(under-over)/components/DateInTimezone";
import { Button } from "@/app/components/Button";
import { createPicks } from "./actions";
import { twMerge } from "tailwind-merge";
import { zodResolver } from "@hookform/resolvers/zod";
import useDynamicRefs from "@/app/hooks/useDynamicRefs";
import { RefObject, useState, useTransition } from "react";
import { redirect } from "next/navigation";

const betButtonStyles = "w-1/2 text-center";

const PropDescription = ({
  prop,
  fields,
}: {
  prop: props;
  fields?: Partial<keyof props>[];
}) => {
  return (
    <div className="text-center text-xl">
      <div>
        {fields?.includes("player_name") && prop.player_name && (
          <h3 className="text-xl">{prop.player_name}</h3>
        )}

        {fields?.includes("under_value") && (
          <div className="flex flex-row items-center justify-center space-x-2">
            <span>
              {prop.under_value} {prop.prop_type}{" "}
            </span>
          </div>
        )}
      </div>

      <div>
        {fields?.includes("players_team") && (
          <p className="text-base">
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
        )}

        {fields?.includes("game_start_time") && prop.game_start_time && (
          <DayAndMonthInTimezone
            date={prop.game_start_time}
            className="text-base"
          />
        )}
      </div>
    </div>
  );
};

export const PicksForm = ({
  slate_id,
  props,
}: {
  slate_id: slates["id"];
  props: props[];
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_isPending, startTransition] = useTransition();
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

  const scrollRefIntoView = (elementId: number | string) => {
    getRef(String(elementId))?.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };

  const scrollNextBetIntoView = (index: number) => {
    if (index + 1 < props.length) {
      scrollRefIntoView(props[index + 1].id);
    } else {
      scrollRefIntoView("picks-form-submit-button");
    }
  };

  const scrollPreviousBetIntoView = (index: number) => {
    if (index > 0) {
      scrollRefIntoView(props[index - 1].id);
    }
  };

  const onSubmit: SubmitHandler<PicksFormFields> = async (data) => {
    try {
      setIsLoading(true);
      await createPicks(data);
    } catch (e) {
      startTransition(() => {
        throw e;
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        redirect(`/under-over/slates/${slate_id}/results`);
      }, 200);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="h-screen">
        <input type="hidden" {...register("slate_id")} />
        {props.map((prop, index) => (
          <div
            key={prop.id}
            id={String(prop.id)}
            // We'll use these refs to scroll the next bet into view
            ref={setRef(String(prop.id)) as RefObject<HTMLDivElement>}
            className="flex h-5/6 flex-col justify-center space-y-4"
          >
            <PropDescription
              prop={prop}
              fields={[
                "player_name",
                "under_value",
                "players_team",
                "game_start_time",
              ]}
            />
            <input
              type="hidden"
              value={prop.id}
              {...register(`picks.${index}.prop_id`)}
            />
            <div className="mt-4 flex flex-row items-center justify-center space-x-2">
              <div className={betButtonStyles}>
                <label>
                  <div
                    className={twMerge(
                      "border-2 border-everglade",
                      getValues(`picks.${index}.selection`) ===
                        PickSelection.Over && "bg-everglade",
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
              </div>
              <div className={betButtonStyles}>
                <label>
                  <div
                    className={twMerge(
                      "border-2 border-mint",
                      getValues(`picks.${index}.selection`) ===
                        PickSelection.Under && "bg-mint",
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
            </div>
            {/* TODO: How should we display these errors if someone scrolls past the pick without clicking on one? */}
            {errors?.picks &&
              errors?.picks[index]?.selection?.type === "invalid_type" && (
                <p>Please select a value</p>
              )}
            <div className="flex flex-row items-center justify-center space-x-2">
              <Button
                type="button"
                text="Back"
                onClick={() => scrollPreviousBetIntoView(index)}
                disabled={index === 0}
              />
              <Button
                type="button"
                text="Next"
                onClick={() => scrollNextBetIntoView(index)}
              />
            </div>
          </div>
        ))}
        <div
          id="picks-form-submit-button"
          ref={setRef("picks-form-submit-button") as RefObject<HTMLDivElement>}
          className="flex h-5/6 flex-col items-center justify-center space-y-4"
        >
          {!getValues().picks
            ? props.map((prop) => (
                <div key={prop.id} className="flex flex-col items-center">
                  <PropDescription
                    prop={prop}
                    fields={["player_name", "under_value"]}
                  />
                  <Button
                    type="button"
                    text="Add Pick"
                    onClick={() => scrollRefIntoView(prop.id)}
                  />
                </div>
              ))
            : getValues().picks?.map((pick) => {
                const prop = props.find((prop) => prop.id == pick.prop_id);
                return (
                  <div key={prop?.id} className="flex flex-col items-center">
                    {!pick.selection && prop && (
                      <>
                        <PropDescription
                          prop={prop}
                          fields={["player_name", "under_value"]}
                        />
                        <Button
                          type="button"
                          text="Add Pick"
                          onClick={() => scrollRefIntoView(pick.prop_id)}
                        />
                      </>
                    )}
                  </div>
                );
              })}
          {/* TODO: Disable button, or dont render if picks still need to be made */}
          <Button
            type="submit"
            text={isLoading ? "Submitting..." : "Submit"}
            className={
              getValues().picks?.length !== props.length ? "opacity-50" : ""
            }
            disabled={isLoading || getValues().picks?.length !== props.length}
          />
        </div>
      </form>
    </div>
  );
};
