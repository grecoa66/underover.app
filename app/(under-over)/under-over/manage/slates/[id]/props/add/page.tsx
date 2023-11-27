import { requireAdmin } from "@/app/api/auth/getUser";

const AppPropPage = async ({ params }: { params: { id: string } }) => {
  // Page requires admin access
  await requireAdmin();

  return (
    <div>
      <p>Add A Prop</p>
    </div>
  );
};

export default AppPropPage;
