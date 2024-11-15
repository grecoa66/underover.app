"use server";
import { RedirectType, redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import {
  AddSlateFormFields,
  AddSlateFormSchema,
  DeleteSlateData,
  EditSlateFormFields,
  EditSlateFormSchema,
} from "@/app/types/slates";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";

// Create a new slate from the client side.
export const createSlate = async (data: AddSlateFormFields) => {
  const currentUser = await requireAdmin();

  const result = AddSlateFormSchema.parse(data);

  // Create a Slate from the API side
  await prisma.slates.create({
    data: {
      ...result,
      start_date: new Date(result.start_date).toISOString(),
      end_date: new Date(result.end_date).toISOString(),
      is_locked: false,
      is_complete: false,
      users: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  revalidateTag("slates");

  redirect("/manage/slates", RedirectType.push);
};

export const editSlate = async (data: EditSlateFormFields) => {
  const currentUser = await requireAdmin();

  const { id, ...rest } = EditSlateFormSchema.parse(data);

  if (rest.is_active && rest.is_complete) {
    throw Error("Slate cannot be active and complete");
  }

  await prisma.slates.update({
    where: {
      id: id,
    },
    data: {
      ...rest,
      // Convert string from the form to a date and then output an ISO string.
      start_date: new Date(rest.start_date).toISOString(),
      end_date: new Date(rest.end_date).toISOString(),
      modified_at: new Date(),
      users: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  revalidateTag("slates");

  redirect("/manage/slates", RedirectType.push);
};

export const deleteSlate = async (data: DeleteSlateData) => {
  await requireAdmin();

  if (data.is_active) {
    throw Error("Slate is active, cannot be deleted");
  }

  await prisma.slates.update({
    where: {
      id: data.id,
    },
    data: {
      deleted_at: new Date(),
    },
  });

  revalidateTag("slates");

  redirect("/manage/slates", RedirectType.push);
};
