"use client";
import TeamSelect from "@/app/(under-over)/components/TeamSelect";
import {
  EditPropFormFields,
  EditPropFormSchema,
  PropResult,
} from "@/app/types/props";
import { League } from "@/app/types/slates";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { props } from "@prisma/client";
import { DateTime } from "luxon";
import { isEnumValue } from "@/app/types/shared";
import { editProp } from "../../actions";
import { FaCheck } from "react-icons/fa";
import { Button } from "@/app/components/Button";
import { useState } from "react";

const EditPropForm = ({
  slate_id,
  props,
}: {
  slate_id: number;
  props: props;
}) => {
  // take start_date out of props because we need to treat it as a string for the form field's default value
  // but as a date for the validator that the react-hook-form relies on. Weird, I know.
  const { start_date, end_date, ...defaultProps } = props;

  const [showEndDate, setShowEndDate] = useState(start_date < end_date);

  const validateLeague = () => {
    if (isEnumValue(defaultProps.league, League)) {
      return defaultProps.league;
    }
    throw Error("League undefined");
  };

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPropFormFields>({
    resolver: zodResolver(EditPropFormSchema),
    defaultValues: {
      ...defaultProps,
      league: validateLeague(),
      timezone: tz,
      slate_id: slate_id,
      player_name: defaultProps.player_name ?? undefined,
      players_team: defaultProps.players_team ?? undefined,
      prop_result: isEnumValue(defaultProps.prop_result, PropResult)
        ? defaultProps.prop_result
        : undefined,
      game_start_time: defaultProps.game_start_time
        ? DateTime.fromJSDate(defaultProps.game_start_time, {
            zone: tz,
          }).toFormat(`yyyy-MM-dd'T'HH:mm`)
        : undefined,
    },
  });

  const onSubmit: SubmitHandler<EditPropFormFields> = (data) => {
    editProp(data);
  };

  return (
    <div className="flex flex-col">
      <form
        className="mx-6 flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("league")} />
        <input type="hidden" {...register("slate_id")} />
        <input type="hidden" {...register("timezone")} />

        <label>
          Start Date{" "}
          <input
            {...register("start_date")}
            type="date"
            defaultValue={DateTime.fromJSDate(start_date)
              .toUTC()
              .toFormat("yyyy-MM-dd")}
          />
        </label>
        {errors?.start_date?.message && (
          <p className="text-red-500">{errors?.start_date?.message}</p>
        )}
        <label>
          {" "}
          Different End Date?
          <input
            type="checkbox"
            checked={showEndDate}
            onChange={() => setShowEndDate(!showEndDate)}
          />
        </label>
        {showEndDate ? (
          <>
            <label>
              End Date{" "}
              <input
                {...register("end_date")}
                type="date"
                defaultValue={DateTime.fromJSDate(end_date)
                  .toUTC()
                  .toFormat("yyyy-MM-dd")}
              />
            </label>
            {errors?.end_date?.message && (
              <p className="text-red-500">{errors?.end_date?.message}</p>
            )}
          </>
        ) : null}

        <label>
          Player&#39;s Name <input {...register("player_name")} />
        </label>
        {errors?.player_name?.message && (
          <p className="text-red-500">{errors?.player_name?.message}</p>
        )}

        <label>
          Player&#39;s Team{" "}
          <TeamSelect
            register={register("players_team")}
            league={validateLeague()}
          />
        </label>
        {errors?.players_team?.message && (
          <p className="text-red-500">{errors?.players_team?.message}</p>
        )}

        <label>
          Away Team{" "}
          <TeamSelect
            register={register("away_team")}
            league={validateLeague()}
          />
        </label>
        {errors?.away_team?.message && (
          <p className="text-red-500">{errors?.away_team?.message}</p>
        )}

        <label>
          Home Team{" "}
          <TeamSelect
            register={register("home_team")}
            league={validateLeague()}
          />
        </label>
        {errors?.home_team?.message && (
          <p className="text-red-500">{errors?.home_team?.message}</p>
        )}

        <label>
          Game Start Time{" "}
          <input {...register("game_start_time")} type="datetime-local" />
        </label>
        {errors?.game_start_time?.message && (
          <p className="text-red-500">{errors?.game_start_time?.message}</p>
        )}

        <label>
          Prop Type <input {...register("prop_type")} />
        </label>
        {errors?.prop_type?.message && (
          <p className="text-red-500">{errors?.prop_type?.message}</p>
        )}

        <label>
          Result{" "}
          <select {...register("prop_result")}>
            <option value={PropResult.Active}>Active</option>
            <option value={PropResult.Under}>Under</option>
            <option value={PropResult.Over}>Over</option>
            <option value={PropResult.Push}>Push</option>
          </select>
        </label>
        {errors?.prop_result?.message && (
          <p className="text-red-500">{errors?.prop_result?.message}</p>
        )}

        {/* Odds fields */}

        <label>
          Prop Value{" "}
          <input {...register("prop_value")} type="number" step=".1" />
        </label>
        {errors?.prop_value?.message && (
          <p className="text-red-500">{errors?.prop_value?.message}</p>
        )}

        <label>
          Over Price <input {...register("over_price")} type="number" />
        </label>
        {errors?.over_price?.message && (
          <p className="text-red-500">{errors?.over_price?.message}</p>
        )}

        <label>
          Under Price <input {...register("under_price")} type="number" />
        </label>
        {errors?.under_price?.message && (
          <p className="text-red-500">{errors?.under_price?.message}</p>
        )}

        <Button
          text={"Submit"}
          type="submit"
          className="w-28"
          StartIcon={FaCheck}
        />
      </form>
    </div>
  );
};

export default EditPropForm;
