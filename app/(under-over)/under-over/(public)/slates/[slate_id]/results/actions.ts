import { prisma } from "@/app/api/__prismaClient";
import { props, slates } from "@prisma/client";
import { groupBy } from "lodash";

export const getResultOfPicks = async ({
  slate_id,
  prop_id,
}: {
  slate_id?: slates["id"];
  prop_id?: props["id"];
}) => {
  if (slate_id) {
    const slate = await prisma.slates.findUnique({
      where: {
        id: slate_id,
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
  } else if (prop_id) {
    const prop = await prisma.props.findUnique({
      where: {
        id: prop_id,
      },
    });

    if (!prop) {
      throw Error("Prop not found");
    }

    const picks = await prisma.picks.findMany({
      where: {
        prop_id: prop.id,
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
  } else {
    throw Error("Slate or Prop id not supplied");
  }
};
