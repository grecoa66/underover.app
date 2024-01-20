"use server";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { picks } from "@prisma/client";
import { revalidateTag } from "next/cache";

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
