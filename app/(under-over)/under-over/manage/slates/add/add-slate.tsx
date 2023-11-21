"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddSlateFormFields, AddSlateSchema, League } from "@/app/types/slates";
import { createSlate } from "./actions";

// TODO: Abstract form components

const AddSlateForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSlateFormFields>({
    resolver: zodResolver(AddSlateSchema),
  });

  const watchShowAge = watch("league", League.NFL);

  const onSubmit: SubmitHandler<AddSlateFormFields> = (data) => {
    createSlate(data);
  };

  return (
    <>
      <div className="flex flex-col">
        <form
          className="mx-6 flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
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

          {watchShowAge === League.NFL && (
            <>
              <label>
                NFL Week #
                <input {...register("nflWeek")} type="number" />
              </label>
              {errors?.nflWeek?.message && (
                <p className="text-red-500">{errors?.nflWeek?.message}</p>
              )}
            </>
          )}

          <label>
            Start Date{" "}
            <input {...register("startDate")} type="datetime-local" />
          </label>
          {errors?.startDate?.message && (
            <p className="text-red-500">{errors?.startDate?.message}</p>
          )}

          <label>
            End Date <input {...register("endDate")} type="datetime-local" />
          </label>
          {errors?.endDate?.message && (
            <p className="text-red-500">{errors?.endDate?.message}</p>
          )}

          <label>
            Is Slate Active?
            <input {...register("isActive")} type="checkbox" />
          </label>
          {errors?.isActive?.message && (
            <p className="text-red-500">{errors?.isActive?.message}</p>
          )}

          <label>
            Is Slate Locked?
            <input {...register("isLocked")} type="checkbox" />
          </label>
          {errors?.isLocked?.message && (
            <p className="text-red-500">{errors?.isLocked?.message}</p>
          )}

          <label>
            Is Slate Complete?
            <input {...register("isComplete")} type="checkbox" />
          </label>
          {errors?.isComplete?.message && (
            <p className="text-red-500">{errors?.isComplete?.message}</p>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export { AddSlateForm };
