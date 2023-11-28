"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeleteSlateData,
  EditSlateFormFields,
  EditSlateFormSchema,
  League,
} from "@/app/types/slates";
import { slates } from "@prisma/client";
import { DateTime } from "luxon";
import { deleteSlate, editSlate } from "../../actions";
import { FaTrash } from "react-icons/fa";

// TODO: Abstract form components
// TODO: Abstract how dates are displayed into a compn\onent

const EditSlateForm = ({ slate }: { slate: slates }) => {
  const {
    register,
    watch,
    setValue,
    setError,
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
    <>
      <div className="mx-6 flex flex-col">
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(handleEditSubmit)}
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
            <input
              {...register("is_active")}
              type="checkbox"
              onClick={() => {
                if (!watchIsActive) {
                  setValue("is_complete", false);
                }
              }}
            />
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
            <input
              {...register("is_complete")}
              type="checkbox"
              onClick={() => {
                if (!watchIsComplete) {
                  setValue("is_active", false);
                }
              }}
            />
          </label>
          {errors?.is_complete?.message && (
            <p className="text-red-500">{errors?.is_complete?.message}</p>
          )}
          {/* Style this button, and the delete one */}
          <button type="submit">Submit</button>
        </form>
        <div>
          <button
            type="button"
            className="flex flex-row items-center rounded-lg border-2 border-red-400 p-3 text-red-400 hover:bg-red-400 hover:text-white"
            onClick={() =>
              handleDeleteOnClick({ id: slate.id, is_active: slate.is_active })
            }
          >
            <FaTrash className="mr-2" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </>
  );
};

export { EditSlateForm };
