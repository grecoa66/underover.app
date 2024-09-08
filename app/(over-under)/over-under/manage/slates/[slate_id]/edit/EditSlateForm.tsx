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
import { slates } from "@prisma/client";
import { DateTime } from "luxon";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaCheck, FaTrash } from "react-icons/fa";

import { ErrorText } from "@/app/(over-under)/components/forms/ErrorText";
import { Button } from "@/app/components/Button";
import {
  DeleteSlateData,
  EditSlateFormFields,
  EditSlateFormSchema,
  League,
} from "@/app/types/slates";

import { deleteSlate, editSlate } from "../../actions";

// TODO: Abstract form components
// TODO: Abstract how dates are displayed into a compnonent

const inputClasses = "bg-gray-200 p-2 dark:bg-gray-500";
const checkboxClasses = "h-5 w-5";

const EditSlateForm = ({ slate }: { slate: slates }) => {
  const {
    register,
    control,
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      league: slate.league as League,
    },
  });

  const league = watch("league");
  // active & complete both can't be true, watch their values so we can toggle the other off.
  const watchIsActive = watch("is_active", slate.is_active);
  const watchIsComplete = watch("is_complete", slate.is_complete);

  const handleEditSubmit: SubmitHandler<EditSlateFormFields> = async (data) => {
    // Handles errors returned from the server action
    await editSlate(data).catch((e) => {
      setError("is_active", { type: "server", message: e.message });
      setError("is_complete", { type: "server", message: e.message });
    });
  };
  const handleDeleteOnClick = (data: DeleteSlateData) => {
    if (data.is_active) {
      alert("This slate is active, can't delete!");
      return;
    }
    deleteSlate(data);
  };

  return (
    <div className="flex w-fit flex-col">
      <form
        className="mx-6 flex flex-col space-y-4"
        onSubmit={handleSubmit(handleEditSubmit)}
      >
        <input type="hidden" {...register("id")} />
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
          <Input
            {...register("is_active")}
            type="checkbox"
            onClick={() => {
              if (!watchIsActive) {
                setValue("is_complete", false);
              }
            }}
            className={checkboxClasses}
          />
          <ErrorText message={errors?.is_active?.message} />
        </Field>

        <Field className="flex flex-col gap-2 items-start">
          <Label>Post Slate Publicly</Label>
          <Input
            {...register("is_public")}
            type="checkbox"
            className={checkboxClasses}
          />
          <ErrorText message={errors?.is_public?.message} />
        </Field>

        <Field className="flex flex-col gap-2 items-start">
          <Label>Slate Locked</Label>
          <Input
            {...register("is_locked")}
            type="checkbox"
            className={checkboxClasses}
          />
          <ErrorText message={errors?.is_locked?.message} />
        </Field>

        <Field className="flex flex-col gap-2 items-start">
          <Label>Slate Complete</Label>
          <Input
            {...register("is_complete")}
            type="checkbox"
            onClick={() => {
              if (!watchIsComplete) {
                setValue("is_active", false);
              }
            }}
            className={checkboxClasses}
          />
          <ErrorText message={errors?.is_complete?.message} />
        </Field>

        <Button
          text={"Submit"}
          type="submit"
          className="w-28"
          StartIcon={FaCheck}
          disabled={isSubmitting}
        />
        <Button
          text="Delete"
          type="button"
          variant="danger"
          className="w-28"
          StartIcon={FaTrash}
          onClick={() =>
            handleDeleteOnClick({ id: slate.id, is_active: slate.is_active })
          }
        />
      </form>
    </div>
  );
};

export { EditSlateForm };
