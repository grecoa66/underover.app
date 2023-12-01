"use server";

import { prisma } from "@/app/api/__prismaClient";
import { getCurrentUser } from "@/app/api/auth/getUser";
import { PicksFormFields, PicksFormSchema } from "@/app/types/picks";
import { slates } from "@prisma/client";

export const getUserPicksForSlate = async (slate_id: slates["id"]) => {
  const user = await getCurrentUser();

  const slate = await prisma.slates.findUnique({
    where: {
      id: slate_id,
      deleted_at: null,
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }

  const props = await prisma.props.findMany({
    where: {
      slate_id: slate.id,
      deleted_at: null,
    },
  });

  const picks = await prisma.picks.findMany({
    where: {
      slate_id: slate.id,
      created_by: user?.id,
      deleted_at: null,
    },
  });

  return { props, picks };
};

export const validatePicks = async (data: PicksFormFields) => {
  console.log("VALIDATE PICKS DATA: ", data);
  const result = PicksFormSchema.parse(data);
  console.log("VALIDATE PICKS RESULT", result);
};
