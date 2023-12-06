"use server";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { picks, props, slates } from "@prisma/client";
import { groupBy } from "lodash";
import { revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export const getPropResults = async (id: props["id"]) => {
  const prop = await prisma.props.findUnique({
    where: {
      id: id,
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
  console.log("getPropResults: ", picksGroupByUser);

  return picksGroupByUser;
};

export const deletePick = async (pick_id: picks["id"]) => {
  await requireAdmin();

  const pick = await prisma.picks.findUnique({
    where: {
      id: pick_id,
    },
  });

  if (!pick) {
    throw Error("Pick not found");
  }

  await prisma.picks.delete({
    where: {
      id: pick_id,
    },
  });

  revalidateTag("picks");
};
