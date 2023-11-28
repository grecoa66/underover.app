import ManageHeader from "@/app/(under-over)/components/ManageHeader";
import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import ManageWrapper from "@/app/(under-over)/components/ManageWrapper";
import { requireAdmin } from "@/app/api/auth/getUser";
import AddPropForm from "./AddPropForm";
import { prisma } from "@/app/api/__prismaClient";
import { League } from "@/app/types/slates";

const AppPropPage = async ({ params }: { params: { id: string } }) => {
  // Page requires admin access
  await requireAdmin();

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
        title="Add a Prop"
        backLink={`/under-over/manage/slates/${params.id}`}
        backText={`Slate #${params.id}`}
      />
      <ManagePanel>
        <AddPropForm slate_id={slate.id} league={slate.league as League} />
      </ManagePanel>
    </ManageWrapper>
  );
};

export default AppPropPage;
