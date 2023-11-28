import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import Slates from "../../../components/Slates";
import ManageHeader from "@/app/(under-over)/components/ManageHeader";
import ManageWrapper from "@/app/(under-over)/components/ManageWrapper";

const ManageSlates = async () => {
  // Page requires admin access
  await requireAdmin();

  // Fetch all the slates
  const slates = await prisma.slates.findMany();

  const activeSlates = slates.filter((slate) => slate.is_active);
  const inactiveSlates = slates.filter((slate) => slate.is_active === false);

  return (
    <ManageWrapper className="mb-24">
      <ManageHeader
        title="Manage Slates"
        backLink="/under-over/manage"
        addLink="/under-over/manage/slates/add"
      />
      <div className="flex flex-col items-center justify-around space-y-4 lg:flex-row lg:items-start lg:space-y-0">
        <Slates slates={activeSlates} areSlatesActive={true} />
        <Slates slates={inactiveSlates} areSlatesActive={false} />
      </div>
    </ManageWrapper>
  );
};

export default ManageSlates;
