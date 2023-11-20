"use client";

import { AddSlateFormFields, AddSlateSchema, League } from "@/app/types/slates";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSlate } from "./actions";

// TODO: Abstract form components

const AddSlateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSlateFormFields>({
    resolver: zodResolver(AddSlateSchema),
  });

  const onSubmit: SubmitHandler<AddSlateFormFields> = (data) => {
    createSlate(data);
  };

  return (
    <>
      <div className="flex flex-col">
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="m-2">
            League{" "}
            <select {...register("league")}>
              <option value="nfl">NFL</option>
              <option value="nfl">NHL</option>
              <option value="nfl">NBA</option>
              <option value="nfl">MLB</option>
            </select>
          </label>

          <label className="m-2">
            Start Date{" "}
            <input {...register("startDate")} type="datetime-local" />
          </label>

          <label className="m-2">
            End Date <input {...register("endDate")} type="datetime-local" />
          </label>
          {errors?.endDate?.message && (
            <p className="text-red-500">{errors?.endDate?.message}</p>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export { AddSlateForm };
