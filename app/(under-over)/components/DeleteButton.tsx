"use client";
import { Button } from "@/app/components/Button";
import { FaTrash } from "react-icons/fa";
import { deleteProp } from "../under-over/manage/slates/[slate_id]/props/actions";
import { picks, props, slates } from "@prisma/client";
import { deletePick } from "../under-over/manage/slates/[slate_id]/props/[prop_id]/picks/actions";

export const DeletePropButton = ({
  prop_id,
  slate_id,
}: {
  prop_id: props["id"];
  slate_id: slates["id"];
}) => {
  return (
    <DeleteButton
      deleteFunction={async () =>
        await deleteProp({ id: prop_id, slate_id: slate_id }).catch((e) =>
          alert(e),
        )
      }
    />
  );
};

export const DeletePickButton = ({ pick_id }: { pick_id: picks["id"] }) => {
  return (
    <DeleteButton
      deleteFunction={async () =>
        await deletePick(pick_id).catch((e) => alert(e))
      }
    />
  );
};

const DeleteButton = ({ deleteFunction }: { deleteFunction: () => void }) => {
  return (
    <Button
      type="button"
      text="Delete"
      variant="danger"
      StartIcon={FaTrash}
      className="w-28"
      onClick={() => deleteFunction()}
    />
  );
};
