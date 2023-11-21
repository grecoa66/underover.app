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

  console.log("data: ", data);

  const validator = zfd.formData(AddSlateSchema);
  const result = validator.parse(data);

  // Create a Slate from the API side
  await prisma.slates.create({
    data: {
      ...result,
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
