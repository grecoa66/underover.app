import { getCurrentUser, requireAdmin } from "@/app/api/auth/getUser";

const ManageSlates = async () => {
  await requireAdmin();

  return <div>Manage Slates</div>;
};

export default ManageSlates;
