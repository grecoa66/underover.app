import ManageHeader from "@/app/(over-under)/components/ManageHeader";
import ManagePanel from "@/app/(over-under)/components/ManagePanel";
import ManageWrapper from "@/app/(over-under)/components/ManageWrapper";
import { requireAdmin } from "@/app/api/auth/getUser";
import AddPropForm from "./AddPropForm";
import { prisma } from "@/app/api/__prismaClient";
import { League } from "@/app/types/slates";

const AddPropPage = async ({ params }: { params: { slate_id: string } }) => {
  // Page requires admin access
  await requireAdmin();

  const slate = await prisma.slates.findUnique({
    where: {
      id: Number(params.slate_id),
      deleted_at: null,
    },
    select: {
      id: true,
      league: true,
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }

  return (
    <ManageWrapper>
      <ManageHeader
        title="Add a Prop"
        backLink={`/over-under/manage/slates/${params.slate_id}`}
        backText={`Slate #${params.slate_id}`}
      />
      <ManagePanel>
        <AddPropForm slate_id={slate.id} league={slate.league as League} />
      </ManagePanel>
    </ManageWrapper>
  );
};

export default AddPropPage;
