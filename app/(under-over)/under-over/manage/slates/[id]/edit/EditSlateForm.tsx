"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditSlateFormFields,
  EditSlateFormSchema,
  League,
} from "@/app/types/slates";
import { slates } from "@prisma/client";
import { DateTime } from "luxon";
import { editSlate } from "../../actions";

// TODO: Abstract form components
// TODO: Abstract how dates are displayed into a compn\onent

const EditSlateForm = ({ slate }: { slate: slates }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EditSlateFormFields>({
    resolver: zodResolver(EditSlateFormSchema),
    defaultValues: {
      ...slate,
      start_date: DateTime.fromJSDate(slate.start_date)
        .toUTC()
        .toFormat("yyyy-MM-dd"),
      end_date: DateTime.fromJSDate(slate.end_date)
        .toUTC()
        .toFormat("yyyy-MM-dd"),
      nfl_week: slate.nfl_week || undefined,
      league: slate.league as League,
    },
  });

  const watchLeague = watch("league", slate.league as League);

  const onSubmit: SubmitHandler<EditSlateFormFields> = (data) => {
    console.log("onSubmit: ", data);
    editSlate(data);
  };

  return (
    <>
      <div className="flex flex-col">
        <form
          className="mx-6 flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" {...register("id")} />
          <label>
            League{" "}
            <select {...register("league")}>
              <option value={League.NFL}>NFL</option>
              <option value={League.NHL}>NHL</option>
              <option value={League.NBA}>NBA</option>
              <option value={League.MLB}>MLB</option>
            </select>
          </label>
          {errors?.league?.message && (
            <p className="text-red-500">{errors?.league?.message}</p>
          )}

          {watchLeague === League.NFL && (
            <>
              <label>
                NFL Week #
                <input {...register("nfl_week")} type="number" />
              </label>
              {errors?.nfl_week?.message && (
                <p className="text-red-500">{errors?.nfl_week?.message}</p>
              )}
            </>
          )}

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
            Is Slate Active?
            <input {...register("is_active")} type="checkbox" />
          </label>
          {errors?.is_active?.message && (
            <p className="text-red-500">{errors?.is_active?.message}</p>
          )}

          <label>
            Is Slate Locked?
            <input {...register("is_locked")} type="checkbox" />
          </label>
          {errors?.is_locked?.message && (
            <p className="text-red-500">{errors?.is_locked?.message}</p>
          )}

          <label>
            Is Slate Complete?
            <input {...register("is_complete")} type="checkbox" />
          </label>
          {errors?.is_complete?.message && (
            <p className="text-red-500">{errors?.is_complete?.message}</p>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export { EditSlateForm };
