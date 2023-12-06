import { prisma } from "@/app/api/__prismaClient";
import { slates } from "@prisma/client";
import { groupBy } from "lodash";

export const getSlateResults = async (id: slates["id"]) => {
  const slate = await prisma.slates.findUnique({
    where: {
      id: id,
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }

  const picks = await prisma.picks.findMany({
    where: {
      slate_id: slate.id,
      deleted_at: null,
    },
    include: {
      users: true,
      props: true,
    },
  });

  const picksGroupByUser = groupBy(picks, (pick) => {
    return pick.created_by;
  });

  return picksGroupByUser;
};
