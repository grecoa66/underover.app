"use server";

import { users } from "@prisma/client";
import { revalidateTag } from "next/cache";

import { prisma } from "@/app/api/__prismaClient";
import { requireUser } from "@/app/api/auth/getUser";

export const getUser = async () => {
  const user = await requireUser();

  const foundUser = await prisma.users.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!foundUser) {
    throw Error("User not found");
  }

  return foundUser;
};

export const getSlatesForUser = async (user_id: users["id"]) => {
  const user = await requireUser();

  const slates = await prisma.slates.findMany({
    where: {
      created_by: user_id,
      deleted_at: null,
    },
  });

  return slates;
};
