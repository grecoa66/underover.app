import { redirect } from "next/navigation";

import { SlateLeaderboard } from "@/app/(over-under)/components/SlateLeaderboard";
import { requireUser } from "@/app/api/auth/getUser";

const SlateResultsPage = async ({
  params,
}: {
  params: { slate_id: string };
}) => {
  const user = await requireUser().catch(() => {
    redirect("/api/auth/signin");
  });

  return <SlateLeaderboard slate_id={Number(params.slate_id)} />;
};

export default SlateResultsPage;
