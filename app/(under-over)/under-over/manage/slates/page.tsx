import { DateTime } from "luxon";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { InactiveSlate } from "./slate";

const ManageSlates = async () => {
  // Page requires admin access
  await requireAdmin();

  // const currentDate = DateTime.now();
  // Fetch all the slates
  const slates = await prisma.slates.findMany();

  const activeSlate = slates.filter((slate) => slate.is_active);
  const inactiveSlate = slates.filter((slate) => slate.is_active === false);

  console.log("slates: ", { slates, activeSlate });

  return (
    <div>
      Manage Slates
      <InactiveSlate slates={inactiveSlate} />
    </div>
  );
};

export default ManageSlates;
