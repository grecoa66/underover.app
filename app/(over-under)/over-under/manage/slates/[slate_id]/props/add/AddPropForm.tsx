"use client";

import { Field, Input, Label } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";

import TeamSelect from "@/app/(over-under)/components/TeamSelect";
import { ErrorText } from "@/app/(over-under)/components/forms/ErrorText";
import {
  checkboxClasses,
  checkboxInputClasses,
  inputClasses,
} from "@/app/(over-under)/components/forms/Styles";
import { Button } from "@/app/components/Button";
import { AddPropFormFields, AddPropFormSchema } from "@/app/types/props";
import { League } from "@/app/types/slates";

import { createProp } from "../actions";

const AddPropForm = ({
  slate_id,
  league,
}: {
  slate_id: number;
  league: League;
}) => {
  const [showEndDate, setShowEndDate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPropFormFields>({
    resolver: zodResolver(AddPropFormSchema),
    defaultValues: {
      slate_id: slate_id,
      league: league,
    },
  });

  const onSubmit: SubmitHandler<AddPropFormFields> = (data) => {
    createProp(data);
  };

  return (
    <div className="flex flex-col">
      <form
        className="mx-6 flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("league")} />
        <input type="hidden" {...register("slate_id")} />

        <Field className={checkboxInputClasses}>
          <Label>Start Date </Label>
          <Input
            {...register("start_date")}
            type="date"
            className={inputClasses}
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
          <TeamSelect register={register("players_team")} league={league} />
        </label>
        {errors?.players_team?.message && (
          <p className="text-red-500">{errors?.players_team?.message}</p>
        )}

        <label>
          Away Team{" "}
          <TeamSelect register={register("away_team")} league={league} />
        </label>
        {errors?.away_team?.message && (
          <p className="text-red-500">{errors?.away_team?.message}</p>
        )}

        <label>
          Home Team{" "}
          <TeamSelect register={register("home_team")} league={league} />
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
        />
      </form>
    </div>
  );
};

export default AddPropForm;
