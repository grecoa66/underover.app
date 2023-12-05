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
import { RefObject } from "react";

const betButtonStyles = "w-1/2 text-center";

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
    if (index + 1 < props.length) {
      getRef(String(props[index + 1].id))?.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    } else {
      console.log("submit btn scroll");
      getRef("picks-form-submit-button")?.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  const scrollPreviousBetIntoView = (index: number) => {
    console.log("prev: ", index, props.length);
    if (index > 0) {
      getRef(String(props[index - 1].id))?.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  const onSubmit: SubmitHandler<PicksFormFields> = (data) => {
    createPicks(data);
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
            className="flex h-5/6  flex-col justify-center space-y-4 text-center text-xl"
          >
            <div>
              {prop.player_name && (
                <h3 className="text-xl">{prop.player_name}</h3>
              )}

              <div className="flex flex-row items-center justify-center space-x-2">
                <span>
                  {prop.under_value} {prop.prop_type}{" "}
                </span>
              </div>
            </div>

            <div>
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

              {prop.game_start_time && (
                <DayAndMonthInTimezone
                  date={prop.game_start_time}
                  className="text-base"
                />
              )}
            </div>
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
          className="flex h-5/6 flex-col items-center justify-center"
        >
          <div>
            {!getValues().picks
              ? props.map((prop) => (
                  <>
                    <div>
                      {prop.player_name && (
                        <h3 className="text-xl">{prop.player_name}</h3>
                      )}

                      <div className="flex flex-row items-center justify-center space-x-2">
                        <span>
                          {prop.under_value} {prop.prop_type}{" "}
                        </span>
                      </div>
                    </div>

                    <div>
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
                    </div>
                    <Button
                      type="button"
                      text="Add Pick"
                      onClick={() => {
                        getRef(String(prop.id))?.current?.scrollIntoView({
                          block: "center",
                          behavior: "smooth",
                        });
                      }}
                    />
                  </>
                ))
              : getValues().picks?.map((pick) => {
                  const prop = props.find((prop) => prop.id == pick.prop_id);

                  return (
                    <>
                      {!pick.selection && prop && (
                        <>
                          <div>
                            {prop.player_name && (
                              <h3 className="text-xl">{prop.player_name}</h3>
                            )}

                            <div className="flex flex-row items-center justify-center space-x-2">
                              <span>
                                {prop.under_value} {prop.prop_type}{" "}
                              </span>
                            </div>
                          </div>

                          <div>
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
                          </div>
                          <Button
                            type="button"
                            text="Add Pick"
                            onClick={() => {
                              getRef(
                                String(pick.prop_id),
                              )?.current?.scrollIntoView({
                                block: "center",
                                behavior: "smooth",
                              });
                            }}
                          />
                        </>
                      )}
                    </>
                  );
                })}
          </div>
          <Button type="submit" text="Submit" />
        </div>
      </form>
    </div>
  );
};
