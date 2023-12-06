"use client";
import { Button } from "@/app/components/Button";
import { FaTrash } from "react-icons/fa";
import { deleteProp } from "../under-over/manage/slates/[slate_id]/props/actions";

export const DeleteButton = ({
  prop_id,
  slate_id,
}: {
  prop_id: number;
  slate_id: number;
}) => {
  return (
    <Button
      type="button"
      text="Delete"
      variant="danger"
      StartIcon={FaTrash}
      className="w-28"
      onClick={async () =>
        await deleteProp({ id: prop_id, slate_id: slate_id }).catch((e) =>
          alert(e),
        )
      }
    />
  );
};
