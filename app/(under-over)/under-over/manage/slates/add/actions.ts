"use server";
import { RedirectType, redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { zfd } from "zod-form-data";
import { AddSlateFormFields, AddSlateSchema } from "@/app/types/slates";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";

// Create a new slate from the client side.
export const createSlate = async (data: AddSlateFormFields) => {
  const currentUser = await requireAdmin();

  const validator = zfd.formData(AddSlateSchema);
  const result = validator.parse(data);

  // Create a Slate from the API side
  await prisma.slates.create({
    data: {
      league: result.league,
      nfl_week: result?.nflWeek,
      start_date: result.startDate,
      end_date: result.endDate,
      is_active: result.isActive,
      is_locked: result.isLocked,
      is_complete: result.isComplete,
      users: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  revalidateTag("slates");
  console.log("REDIRECTING.....");
  redirect("/under-over/manage/slates", RedirectType.push);
};
