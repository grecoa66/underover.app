import { prisma } from "@/app/api/__prismaClient";
import { picks, slates } from "@prisma/client";
import { User } from "next-auth";

export const getUserProfile = async ({
  userId,
}: {
  userId: User["id"];
}): Promise<User> => {
  const user = await prisma.users.findUniqueOrThrow({
    where: {
      id: Number(userId),
    },
  });
  return {
    ...user,
    id: String(user.id),
    role: user.role === null ? undefined : user.role,
  };
};

export const getUserBettingDetails = async ({
  userId,
}: {
  userId: User["id"];
}): Promise<{ slates: slates[]; picks: picks[] }> => {
  const user = await prisma.users.findUniqueOrThrow({
    where: {
      id: Number(userId),
    },
  });

  // Get all slates this user has participated in
  const picks = await prisma.picks.findMany({
    where: {
      created_by: Number(user.id),
    },
  });

  const slate_ids = new Set(picks.map((pick) => pick.slate_id));

  const slates = await prisma.slates.findMany({
    where: {
      id: {
        in: Array.from(slate_ids),
      },
    },
  });

  return { picks, slates };
};
