import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/app/api/auth/getUser";

const ManageUnderOver = async () => {
  await requireAdmin();
  return (
    <div>
      <Link href={"/under-over/manage/slates"}>Slates</Link>
    </div>
  );
};

export default ManageUnderOver;
