import React from "react";
import { requireAdmin } from "@/app/api/auth/getUser";
import { LinkButton } from "../../../components/Button";

const ManageUnderOver = async () => {
  await requireAdmin();
  return (
    <div>
      <LinkButton href={"/over-under/manage/slates"} text="Slates" />
    </div>
  );
};

export default ManageUnderOver;
