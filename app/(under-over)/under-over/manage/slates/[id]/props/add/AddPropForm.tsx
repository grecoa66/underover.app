"use client";
import { AddPropFormFields, AddPropFormSchema } from "@/app/types/props";
import { League } from "@/app/types/slates";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
const AddPropForm = ({ league }: { league: League }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPropFormFields>({
    resolver: zodResolver(AddPropFormSchema),
    defaultValues: {
      league: league,
      prop_result: "active",
    },
  });

  const onSubmit: SubmitHandler<AddPropFormFields> = (data) => {
    console.log("Submit Prop: ", data);
  };

  return (
    <div className="flex flex-col">
      {/* {errors && <p>{JSON.stringify(errors)}</p>} */}
      <form
        className="mx-6 flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("league")} />

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
          Player Name <input {...register("player_name")} />
        </label>
        {errors?.player_name?.message && (
          <p className="text-red-500">{errors?.player_name?.message}</p>
        )}

        <label>
          Team Name <input {...register("team_name")} />
        </label>
        {errors?.team_name?.message && (
          <p className="text-red-500">{errors?.team_name?.message}</p>
        )}

        {/* TODO: I want this to be two inputs. One for away team, one for fome team */}
        <label>
          Matchup <input {...register("team_matchup")} />
        </label>
        {errors?.team_matchup?.message && (
          <p className="text-red-500">{errors?.team_matchup?.message}</p>
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
            <option value={"active"}>Active</option>
            <option value={"under"}>Under</option>
            <option value={"over"}>Over</option>
            <option value={"push"}>Push</option>
          </select>
        </label>
        {errors?.team_matchup?.message && (
          <p className="text-red-500">{errors?.team_matchup?.message}</p>
        )}

        <label>
          Under Value <input {...register("under_value")} type="number" />
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
          Over Value <input {...register("over_value")} type="number" />
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
