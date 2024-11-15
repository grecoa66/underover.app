import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { ManageSlates } from "../../components/Slates";
import ManageHeader from "@/app/(over-under)/components/ManageHeader";
import ManageWrapper from "@/app/(over-under)/components/ManageWrapper";

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
  const inactiveSlates = slates.filter((slate) => slate.is_active === false);

  return (
    <ManageWrapper className="mb-24">
      <ManageHeader
        title="Manage Slates"
        backLink="/manage"
        addLink="/manage/slates/add"
      />
      <div className="flex flex-col items-center justify-around  space-y-4 ">
        <ManageSlates slates={activeSlates} areSlatesActive={true} />
        <ManageSlates slates={inactiveSlates} areSlatesActive={false} />
      </div>
    </ManageWrapper>
  );
};

export default ManageSlatesPage;
