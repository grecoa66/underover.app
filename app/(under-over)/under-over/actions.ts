"use server";

import { prisma } from "@/app/api/__prismaClient";
import { getCurrentUser } from "@/app/api/auth/getUser";

export const getMyActiveSlates = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw Error("User not logged in");
  }
};

export const getUpcomingSlates = async () => {
  // const currentUser = await getCurrentUser();
  const currentDate = new Date();
  const slates = prisma.slates.findMany({
    where: {
      start_date: {
        gte: currentDate,
      },
      deleted_at: null,
      is_public: true,
    },
  });

  return slates;
};

export const getPastSlates = async () => {
  // const currentUser = await getCurrentUser();
};
