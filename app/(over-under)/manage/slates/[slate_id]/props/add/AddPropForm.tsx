"use client";
import TeamSelect from "@/app/(over-under)/components/TeamSelect";
import { AddPropFormFields, AddPropFormSchema } from "@/app/types/props";
import { League } from "@/app/types/slates";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { createProp } from "../actions";
import { FaCheck } from "react-icons/fa";
import { Button } from "@/app/components/Button";
import { useState } from "react";
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
      {/* {errors && <p>{JSON.stringify(errors)}</p>} */}
      <form
        className="mx-6 flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("league")} />
        <input type="hidden" {...register("slate_id")} />

        <label>
          Start Date <input {...register("start_date")} type="date" />
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
              End Date <input {...register("end_date")} type="date" />
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

export default AddPropForm;
