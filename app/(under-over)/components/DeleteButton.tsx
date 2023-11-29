"use client";
import { Button } from "@/app/components/Button";
import { FaTrash } from "react-icons/fa";
import { deleteProp } from "../under-over/manage/slates/[slateId]/props/actions";

export const DeleteButton = ({
  propId,
  slateId,
}: {
  propId: number;
  slateId: number;
}) => {
  return (
    <Button
      type="button"
      text="Delete"
      variant="danger"
      StartIcon={FaTrash}
      className="w-28"
      onClick={async () =>
        await deleteProp({ id: propId, slate_id: slateId }).catch((e) =>
          alert(e),
        )
      }
    />
  );
};
