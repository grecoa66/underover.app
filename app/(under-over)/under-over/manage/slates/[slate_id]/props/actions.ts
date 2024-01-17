"use server";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { PickResult } from "@/app/types/picks";
import {
  AddPropFormFields,
  AddPropFormSchema,
  DeletePropData,
  EditPropFormFields,
  EditPropFormSchema,
  PropResult,
} from "@/app/types/props";
import { props } from "@prisma/client";
import { DateTime } from "luxon";
import { revalidateTag } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

export const createProp = async (data: AddPropFormFields) => {
  const currentUser = await requireAdmin();

  const { slate_id, end_date, under_value, ...result } =
    AddPropFormSchema.parse(data);

  await prisma.props.create({
    data: {
      ...result,
      ...(end_date ? { end_date } : { end_date: result.start_date }),
      ...(under_value ? { under_value } : { under_value: result.over_value }),
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

  redirect(`/under-over/manage/slates/${slate_id}`, RedirectType.push);
};

export const editProp = async (data: EditPropFormFields) => {
  const currentUser = await requireAdmin();

  const {
    id,
    slate_id,
    start_date,
    end_date,
    game_start_time,
    under_value,
    timezone,
    ...result
  } = EditPropFormSchema.parse(data);

  console.log(
    "game start time: ",
    game_start_time,
    " Timezone: ",
    timezone,
    " to js date: ",
    DateTime.fromISO(game_start_time).toJSDate(),
  );

  await prisma.props.update({
    where: {
      id,
    },
    data: {
      ...result,
      ...(under_value && { under_value }),
      start_date: new Date(start_date).toISOString(),
      end_date: end_date
        ? new Date(end_date).toISOString()
        : new Date(start_date).toISOString(),
      game_start_time: DateTime.fromISO(game_start_time, {
        zone: timezone,
      }).toJSDate(),
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

  redirect(`/under-over/manage/slates/${slate_id}`, RedirectType.push);
};

export const deleteProp = async (data: DeletePropData) => {
  await requireAdmin();

  const slate = await prisma.slates.findUnique({
    where: {
      id: data.slate_id,
    },
    select: {
      id: true,
      is_active: true,
      is_complete: true,
      is_locked: true,
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }
  if (slate.is_active || slate.is_complete || slate.is_locked) {
    throw Error(
      "Can't delete prop while in slate is active, locked, or complete.",
    );
  }

  await prisma.props.update({
    where: {
      id: data.id,
    },
    data: {
      deleted_at: new Date(),
    },
  });

  revalidateTag("props");

  redirect(`/under-over/manage/slates/${data.slate_id}`, RedirectType.push);
};

export const settleProp = async (
  prop_id: props["id"],
  propResult: props["prop_result"],
) => {
  await requireAdmin();

  await prisma.props.update({
    where: {
      id: prop_id,
    },
    data: {
      prop_result: propResult,
    },
  });

  const picks = await prisma.picks.findMany({
    where: {
      prop_id: prop_id,
      deleted_at: null,
    },
  });

  if (propResult === PropResult.Active) {
    // Set "pick_result" back to null for all picks
    return await prisma.picks.updateMany({
      where: {
        prop_id: prop_id,
        deleted_at: null,
      },
      data: {
        pick_result: null,
      },
    });
  }

  const pickUpdates = picks.map((pick) => {
    if (propResult === PropResult.Push) {
      return prisma.picks.update({
        where: {
          id: pick.id,
        },
        data: {
          pick_result: PickResult.Push,
        },
      });
    }
    if (pick.selection === propResult) {
      return prisma.picks.update({
        where: {
          id: pick.id,
        },
        data: {
          pick_result: PickResult.Win,
        },
      });
    }

    return prisma.picks.update({
      where: {
        id: pick.id,
      },
      data: {
        pick_result: PickResult.Lose,
      },
    });
  });

  await prisma.$transaction(pickUpdates);

  revalidateTag("props");
  revalidateTag("picks");
};
