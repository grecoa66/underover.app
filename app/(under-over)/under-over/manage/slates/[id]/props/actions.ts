"use server";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { AddPropFormFields, AddPropFormSchema } from "@/app/types/props";
import { revalidateTag } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

export const createProp = async (data: AddPropFormFields) => {
  const currentUser = await requireAdmin();

  const { home_team, away_team, slate_id, ...result } =
    AddPropFormSchema.parse(data);

  console.log("after parse: ", result);

  await prisma.props.create({
    data: {
      ...result,
      team_matchup: `${away_team} vs. ${home_team}`,
      created_at: new Date(),
      modified_at: new Date(),
      users: {
        connect: {
          id: currentUser.id,
        },
      },
      slates: {
        connect: {
          id: slate_id,
        },
      },
    },
  });

  revalidateTag("props");

  redirect("/under-over/manage/slates", RedirectType.push);
};
