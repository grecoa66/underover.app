import { requireAdmin } from "@/app/api/auth/getUser";
import { prisma } from "@/app/api/__prismaClient";
import { EditSlateForm } from "./EditSlateForm";
import ManageHeader from "@/app/(under-over)/components/ManageHeader";
import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import ManageWrapper from "@/app/(under-over)/components/ManageWrapper";

const EditSlate = async ({ params }: { params: { id: string } }) => {
  // Page requires admin access
  await requireAdmin();

  // Fetch all the slates
  const slate = await prisma.slates.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }

  return (
    <ManageWrapper>
      <ManageHeader
        title={`Edit Slate #${params.id}`}
        backLink="/under-over/manage/slates"
      />
      <ManagePanel>
        <EditSlateForm slate={slate} />
      </ManagePanel>
    </ManageWrapper>
  );
};

export default EditSlate;
