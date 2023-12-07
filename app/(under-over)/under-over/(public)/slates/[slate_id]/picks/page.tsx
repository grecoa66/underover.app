import { requireUser } from "@/app/api/auth/getUser";
import { redirect } from "next/navigation";
import { getUserPicksForSlate } from "./actions";
import { PicksForm } from "./PicksForm";

const PicksPage = async ({ params }: { params: { slate_id: number } }) => {
  const user = await requireUser().catch(() => {
    redirect("/api/auth/signin");
  });

  const { props, picks } = await getUserPicksForSlate(Number(params.slate_id));

  return (
    <div className="h-full overflow-hidden">
      <PicksForm slate_id={params.slate_id} props={props} />
    </div>
  );
};

export default PicksPage;
