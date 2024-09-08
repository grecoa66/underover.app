"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Input,
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";

import {
  AddSlateFormFields,
  AddSlateFormSchema,
  League,
} from "@/app/types/slates";
import { createSlate } from "../actions";
import { Button } from "@/app/components/Button";
import { FaCheck } from "react-icons/fa";

// TODO: Abstract form components

const inputClasses = "bg-gray-200 p-2 dark:bg-gray-500";

const AddSlateForm = () => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSlateFormFields>({
    resolver: zodResolver(AddSlateFormSchema),
    defaultValues: {
      league: League.NFL,
    },
  });

  const league = watch("league");

  const onSubmit: SubmitHandler<AddSlateFormFields> = (data) => {
    createSlate(data);
  };

  return (
    <>
      <div className="flex w-fit flex-col">
        <form
          className="mx-6 flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* TODO: replace all the other inputs with headless UI */}
          <Field className="flex flex-col gap-2 ">
            <Label>Slate Title </Label>
            <Input
              {...register("title")}
              type="text"
              className={inputClasses}
            />
            {errors?.title?.message && (
              <Label className="text-red-500 ">{errors.title.message}</Label>
            )}
          </Field>
          <Controller
            control={control}
            {...register("league")}
            render={({ field: { onChange } }) => (
              <Listbox
                aria-label="League"
                as="div"
                className="flex flex-col gap-2"
                {...register("league")}
                onChange={(e) => onChange(e)}
              >
                <Label>League</Label>
                <ListboxButton className={inputClasses}>{league}</ListboxButton>
                <ListboxOptions anchor="bottom">
                  {[League.NFL, League.NHL, League.NBA, League.MLB, "MLS"].map(
                    (value) => (
                      <ListboxOption
                        value={value}
                        className="bg-gray-300 px-8 py-2 hover:bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-500"
                      >
                        {value}
                      </ListboxOption>
                    ),
                  )}
                </ListboxOptions>
                {errors?.league?.message && (
                  <p className="text-red-500">{errors?.league?.message}</p>
                )}
              </Listbox>
            )}
          />

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
