import ManageHeader from "@/app/(under-over)/components/ManageHeader";
import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import ManageWrapper from "@/app/(under-over)/components/ManageWrapper";
import { requireAdmin } from "@/app/api/auth/getUser";
import AddPropForm from "./AddPropForm";
import { prisma } from "@/app/api/__prismaClient";
import { League } from "@/app/types/slates";

const AddPropPage = async ({ params }: { params: { slateId: string } }) => {
  // Page requires admin access
  await requireAdmin();

  const slate = await prisma.slates.findUnique({
    where: {
      id: Number(params.slateId),
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }

  return (
    <ManageWrapper>
      <ManageHeader
        title="Add a Prop"
        backLink={`/under-over/manage/slates/${params.slateId}`}
        backText={`Slate #${params.slateId}`}
      />
      <ManagePanel>
        <AddPropForm slate_id={slate.id} league={slate.league as League} />
      </ManagePanel>
    </ManageWrapper>
  );
};

export default AddPropPage;
