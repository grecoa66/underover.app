"use client";

import {
  Field,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";

import { ErrorText } from "@/app/(over-under)/components/forms/ErrorText";
import { Button } from "@/app/components/Button";
import {
  AddSlateFormFields,
  AddSlateFormSchema,
  League,
} from "@/app/types/slates";

import { createSlate } from "../actions";

// TODO: Abstract form components

const inputClasses = "bg-gray-200 p-2 dark:bg-gray-500";

const AddSlateForm = () => {
  const router = useRouter();
  // manage submit button loading state
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddSlateFormFields>({
    resolver: zodResolver(AddSlateFormSchema),
    defaultValues: {
      league: League.NFL,
    },
  });

  const league = watch("league");

  const onSubmit: SubmitHandler<AddSlateFormFields> = async (data) => {
    try {
      await createSlate(data);
      router.push("/over-under/manage/slates");
      // TODO: Add a toast message for this
    } catch (e) {
      // TODO: Add a toast message for this
      console.log("Error creating slate", e);
    }
  };

  return (
    <div className="flex w-fit flex-col">
      <form
        className="mx-6 flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field className="flex flex-col gap-2 ">
          <Label>Slate Title </Label>
          <Input {...register("title")} type="text" className={inputClasses} />
          <ErrorText message={errors?.title?.message} />
        </Field>
        <Controller
          control={control}
          {...register("league")}
          render={({ field: { onChange, ref } }) => (
            <Listbox
              aria-label="League"
              as="div"
              className="flex flex-col gap-2"
              {...register("league")}
              onChange={(e) => onChange(e)}
            >
              <Label>League</Label>
              <ListboxButton ref={ref} className={inputClasses}>
                {league}
              </ListboxButton>
              <ListboxOptions anchor="bottom">
                {[League.NFL, League.NHL, League.NBA, League.MLB, "MLS"].map(
                  (value) => (
                    <ListboxOption
                      key={value}
                      value={value}
                      className="bg-gray-300 px-8 py-2 hover:bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-500"
                    >
                      {value}
                    </ListboxOption>
                  ),
                )}
              </ListboxOptions>
              <ErrorText message={errors?.league?.message} />
            </Listbox>
          )}
        />

        <Field className="flex flex-col gap-2 ">
          <Label>Start Date </Label>
          <Input
            {...register("start_date")}
            type="date"
            className={inputClasses}
          />
          <ErrorText message={errors?.start_date?.message} />
        </Field>
        <Field className="flex flex-col gap-2 ">
          <Label>End Date </Label>
          <Input
            {...register("end_date")}
            type="date"
            className={inputClasses}
          />
          <ErrorText message={errors?.end_date?.message} />
        </Field>
        <Field className="flex flex-col gap-2 items-start">
          <Label>Slate Active</Label>
          <Input {...register("is_active")} type="checkbox" />
          <ErrorText message={errors?.is_active?.message} />
        </Field>
        <Field className="flex flex-col gap-2 items-start">
          <Label>Post Slate Publicly</Label>
          <Input {...register("is_public")} type="checkbox" />
          <ErrorText message={errors?.is_public?.message} />
        </Field>
        <Button
          text={"Submit"}
          type="submit"
          disabled={isSubmitting}
          className="w-28 mt-8"
          StartIcon={FaCheck}
        />
      </form>
    </div>
  );
};

export { AddSlateForm };
