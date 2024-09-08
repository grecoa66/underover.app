import ManageHeader from "@/app/(over-under)/components/ManageHeader";
import ManageWrapper from "@/app/(over-under)/components/ManageWrapper";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";

import { ManageSlates } from "../../../components/Slates";

const ManageSlatesPage = async () => {
  // Page requires admin access
  await requireAdmin();

  // Fetch all the slates
  const slates = await prisma.slates.findMany({
    where: {
      deleted_at: null,
    },
  });

  const activeSlates = slates.filter((slate) => slate.is_active);
  const completedSlates = slates.filter((slate) => slate.is_complete);
  const inactiveSlates = slates.filter(
    (slate) => slate.is_complete === false && slate.is_active === false,
  );

  return (
    <ManageWrapper className="mb-24">
      <ManageHeader
        title="Manage Slates"
        backLink="/over-under/manage"
        addLink="/over-under/manage/slates/add"
      />
      <div className="flex flex-col items-center justify-around  space-y-4 ">
        <ManageSlates slates={activeSlates} title={"Active Slates"} />
        <ManageSlates slates={inactiveSlates} title={"Inactive Slates"} />
        <ManageSlates slates={completedSlates} title={"Completed Slates"} />
      </div>
    </ManageWrapper>
  );
};

export default ManageSlatesPage;
