import ManageHeader from "@/app/(under-over)/components/ManageHeader";
import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import ManageWrapper from "@/app/(under-over)/components/ManageWrapper";
import { requireAdmin } from "@/app/api/auth/getUser";
import EditPropForm from "./EditPropForm";
import { prisma } from "@/app/api/__prismaClient";

const EditPropPage = async ({
  params,
}: {
  params: { slateId: string; propId: string };
}) => {
  // Page requires admin access
  await requireAdmin();

  const slate = await prisma.slates.findUnique({
    where: {
      id: Number(params.slateId),
    },
    select: {
      id: true,
    },
  });

  const prop = await prisma.props.findUnique({
    where: {
      id: Number(params.propId),
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }
  if (!prop) {
    throw Error("Prop not found");
  }

  return (
    <ManageWrapper>
      <ManageHeader
        title="Edit Prop"
        backLink={`/under-over/manage/slates/${params.slateId}`}
        backText={`Slate #${params.slateId}`}
      />
      <ManagePanel>
        <EditPropForm slate_id={slate.id} prop={prop} />
      </ManagePanel>
    </ManageWrapper>
  );
};

export default EditPropPage;
