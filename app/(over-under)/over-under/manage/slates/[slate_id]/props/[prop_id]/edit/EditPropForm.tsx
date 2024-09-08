"use client";

import { Field, Input, Label } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { props } from "@prisma/client";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCheck, FaTrash } from "react-icons/fa";

import TeamSelect from "@/app/(over-under)/components/TeamSelect";
import { ErrorText } from "@/app/(over-under)/components/forms/ErrorText";
import {
  checkboxClasses,
  checkboxInputClasses,
  inputClasses,
} from "@/app/(over-under)/components/forms/Styles";
import { Button } from "@/app/components/Button";
import {
  DeletePropData,
  EditPropFormFields,
  EditPropFormSchema,
  PropResult,
} from "@/app/types/props";
import { isEnumValue } from "@/app/types/shared";
import { League } from "@/app/types/slates";

import { deleteProp, editProp } from "../../actions";

const EditPropForm = ({
  slate_id,
  props,
}: {
  slate_id: number;
  props: props;
}) => {
  const router = useRouter();
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
    formState: { errors, isSubmitting },
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

  const onSubmit: SubmitHandler<EditPropFormFields> = async (data) => {
    try {
      await editProp(data);
      router.push(`/over-under/manage/slates/${slate_id}`);
      // TODO: Add a toast message for this
    } catch (e) {
      // TODO: Add a toast message for this
      console.error("Error editing prop", e);
    }
  };

  const handleDeleteOnClick = async ({ id, slate_id }: DeletePropData) => {
    await deleteProp({ id, slate_id });
  };

  console.log("is_active", defaultProps.is_active);

  return (
    <div className="flex flex-col">
      <form
        className="mx-6 flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("league")} />
        <input type="hidden" {...register("slate_id")} />
        <input type="hidden" {...register("timezone")} />

        <Field className={checkboxInputClasses}>
          <Label>Start Date </Label>
          <Input
            {...register("start_date")}
            type="date"
            className={inputClasses}
            defaultValue={DateTime.fromJSDate(start_date)
              .toUTC()
              .toFormat("yyyy-MM-dd")}
          />
          <ErrorText message={errors?.start_date?.message} />
        </Field>

        <Field className={checkboxInputClasses}>
          <Label> Different End Date?</Label>
          <Input
            type="checkbox"
            checked={showEndDate}
            onChange={() => setShowEndDate(!showEndDate)}
            className={checkboxClasses}
          />
        </Field>
        {showEndDate ? (
          <Field className={checkboxInputClasses}>
            <Label>End Date </Label>
            <Input
              {...register("end_date")}
              type="date"
              className={inputClasses}
              defaultValue={DateTime.fromJSDate(end_date)
                .toUTC()
                .toFormat("yyyy-MM-dd")}
            />
            <ErrorText message={errors?.end_date?.message} />
          </Field>
        ) : null}

        <Field className={checkboxInputClasses}>
          <Label>Player&#39;s Name </Label>
          <Input
            {...register("player_name")}
            type="text"
            className={inputClasses}
          />
          <ErrorText message={errors?.player_name?.message} />
        </Field>

        {/* TODO: Make the Team Select use ListBox from headless */}

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

        <Field className={checkboxInputClasses}>
          <Label>Game Start Time </Label>
          <Input
            {...register("game_start_time")}
            type="datetime-local"
            className={inputClasses}
          />
          <ErrorText message={errors?.game_start_time?.message} />
        </Field>

        <Field className={checkboxInputClasses}>
          <Label>Prop Type</Label>
          <Input
            {...register("prop_type")}
            type="text"
            className={inputClasses}
          />
          <ErrorText message={errors?.prop_type?.message} />
        </Field>

        {/* Odds fields */}
        <Field className={checkboxInputClasses}>
          <Label>Prop Value</Label>
          <Input
            {...register("prop_value")}
            type="number"
            step=".1"
            className={inputClasses}
          />
          <ErrorText message={errors?.prop_value?.message} />
        </Field>

        <Field className={checkboxInputClasses}>
          <Label>Over Price </Label>
          <Input
            {...register("over_price")}
            type="number"
            className={inputClasses}
          />
          <ErrorText message={errors?.over_price?.message} />
        </Field>
        <Field className={checkboxInputClasses}>
          <Label>Under Price </Label>
          <Input
            {...register("under_price")}
            type="number"
            className={inputClasses}
          />
          <ErrorText message={errors?.under_price?.message} />
        </Field>

        <Button
          text={"Submit"}
          type="submit"
          className="w-28"
          StartIcon={FaCheck}
          disabled={isSubmitting}
        />
        <Button
          text="Delete"
          type="button"
          variant="danger"
          className="w-28"
          StartIcon={FaTrash}
          onClick={() => {
            handleDeleteOnClick({
              id: defaultProps.id,
              slate_id: slate_id,
            });
          }}
          disabled={isSubmitting || defaultProps.is_active}
        />
      </form>
    </div>
  );
};

export default EditPropForm;
