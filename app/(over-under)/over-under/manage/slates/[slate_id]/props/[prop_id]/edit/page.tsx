import ManageHeader from "@/app/(over-under)/components/ManageHeader";
import ManagePanel from "@/app/(over-under)/components/ManagePanel";
import ManageWrapper from "@/app/(over-under)/components/ManageWrapper";
import { requireAdmin } from "@/app/api/auth/getUser";
import EditPropForm from "./EditPropForm";
import { prisma } from "@/app/api/__prismaClient";

const EditPropPage = async ({
  params,
}: {
  params: { slate_id: string; prop_id: string };
}) => {
  // Page requires admin access
  await requireAdmin();

  const slate = await prisma.slates.findUnique({
    where: {
      id: Number(params.slate_id),
      deleted_at: null,
    },
    select: {
      id: true,
    },
  });

  const prop = await prisma.props.findUnique({
    where: {
      id: Number(params.prop_id),
      deleted_at: null,
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
        backLink={`/over-under/manage/slates/${params.slate_id}`}
        backText={`Slate #${params.slate_id}`}
      />
      <ManagePanel>
        <EditPropForm slate_id={slate.id} props={prop} />
      </ManagePanel>
    </ManageWrapper>
  );
};

export default EditPropPage;
