"use client";
import TeamSelect from "@/app/(under-over)/components/TeamSelect";
import {
  AddPropFormFields,
  AddPropFormSchema,
  PropResult,
} from "@/app/types/props";
import { League } from "@/app/types/slates";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { createProp } from "../actions";
const AddPropForm = ({
  slate_id,
  league,
}: {
  slate_id: number;
  league: League;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPropFormFields>({
    resolver: zodResolver(AddPropFormSchema),
    defaultValues: {
      slate_id: slate_id,
      league: league,
      prop_result: PropResult.Active,
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
          End Date <input {...register("end_date")} type="date" />
        </label>
        {errors?.end_date?.message && (
          <p className="text-red-500">{errors?.end_date?.message}</p>
        )}

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

        <label>
          Under Value{" "}
          <input {...register("under_value")} type="number" step=".1" />
        </label>
        {errors?.under_value?.message && (
          <p className="text-red-500">{errors?.under_value?.message}</p>
        )}

        <label>
          Under Price <input {...register("under_price")} type="number" />
        </label>
        {errors?.under_price?.message && (
          <p className="text-red-500">{errors?.under_price?.message}</p>
        )}

        <label>
          Over Value{" "}
          <input {...register("over_value")} type="number" step=".1" />
        </label>
        {errors?.over_value?.message && (
          <p className="text-red-500">{errors?.over_value?.message}</p>
        )}

        <label>
          Over Price <input {...register("over_price")} type="number" />
        </label>
        {errors?.over_price?.message && (
          <p className="text-red-500">{errors?.over_price?.message}</p>
        )}

        {/* TODO: Style this button, or use a styled one */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPropForm;
