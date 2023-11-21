"use server";
import { RedirectType, redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { zfd } from "zod-form-data";
import { SlateFormFields, SlateFormSchema } from "@/app/types/slates";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";

// Create a new slate from the client side.
export const createSlate = async (data: SlateFormFields) => {
  const currentUser = await requireAdmin();

  console.log("data: ", data);

  const validator = zfd.formData(SlateFormSchema);
  const result = validator.parse(data);

  // Create a Slate from the API side
  await prisma.slates.create({
    data: {
      ...result,
      start_date: new Date(result.start_date),
      end_date: new Date(result.end_date),
      users: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  revalidateTag("slates");

  redirect("/under-over/manage/slates", RedirectType.push);
};
