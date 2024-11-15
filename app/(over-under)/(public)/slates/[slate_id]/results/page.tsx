import { requireUser } from "@/app/api/auth/getUser";
import { redirect } from "next/navigation";
import { getResultForLeaderboard } from "./actions";
import { SlateLeaderboard } from "@/app/components/SlateLeaderboard";

const SlateResultsPage = async ({
  params,
}: {
  params: { slate_id: string };
}) => {
  const user = await requireUser().catch(() => {
    redirect("/api/auth/signin");
  });

  const LeaderboardResults = await getResultForLeaderboard({
    slate_id: Number(params.slate_id),
  });

  return <SlateLeaderboard results={LeaderboardResults} />;
};

export default SlateResultsPage;
