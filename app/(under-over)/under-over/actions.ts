"use server";

import { prisma } from "@/app/api/__prismaClient";
import { getCurrentUser } from "@/app/api/auth/getUser";

// TODO: when bets are hooked up, this function needs to fetch all slates that this user has entered bets for.
export const getMyActiveSlates = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw Error("User not logged in");
  }
  const slates = prisma.slates.findMany({
    where: {
      deleted_at: null,
      is_active: true,
      is_public: true,
      is_complete: false,
    },
  });

  return slates;
};

export const getActiveSlates = async () => {
  const slates = prisma.slates.findMany({
    where: {
      deleted_at: null,
      is_active: true,
      is_public: true,
      is_complete: false,
    },
  });

  return slates;
};

export const getUpcomingSlates = async () => {
  const slates = prisma.slates.findMany({
    where: {
      deleted_at: null,
      is_active: false,
      is_public: true,
      is_complete: false,
    },
  });

  return slates;
};

// TODO: Paginate how many slates we fetch
export const getCompletedSlates = async () => {
  const slates = prisma.slates.findMany({
    where: {
      deleted_at: null,
      is_public: true,
      is_active: false,
      is_complete: true,
    },
  });

  return slates;
};
