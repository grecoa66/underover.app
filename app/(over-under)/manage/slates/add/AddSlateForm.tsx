"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddSlateFormFields,
  AddSlateFormSchema,
  League,
} from "@/app/types/slates";
import { createSlate } from "../actions";
import { Button } from "@/app/components/Button";
import { FaCheck } from "react-icons/fa";

// TODO: Abstract form components

const AddSlateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSlateFormFields>({
    resolver: zodResolver(AddSlateFormSchema),
    defaultValues: {
      league: League.NFL,
    },
  });

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
            Slate Title <input {...register("title")} type="text" />
          </label>
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
            Post Slate Publicly?
            <input {...register("is_public")} type="checkbox" />
          </label>
          {errors?.is_public?.message && (
            <p className="text-red-500">{errors?.is_public?.message}</p>
          )}

          <Button
            text={"Submit"}
            type="submit"
            className="w-28"
            StartIcon={FaCheck}
          />
        </form>
      </div>
    </>
  );
};

export { AddSlateForm };
