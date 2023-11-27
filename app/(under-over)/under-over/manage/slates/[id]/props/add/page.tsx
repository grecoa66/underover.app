import ManageHeader from "@/app/(under-over)/components/ManageHeader";
import { requireAdmin } from "@/app/api/auth/getUser";

const AppPropPage = async ({ params }: { params: { id: string } }) => {
  // Page requires admin access
  await requireAdmin();

  return (
    <div>
      <ManageHeader
        title="Add a Prop"
        backLink={`/under-over/manage/slates/${params.id}`}
      />
    </div>
  );
};

export default AppPropPage;
