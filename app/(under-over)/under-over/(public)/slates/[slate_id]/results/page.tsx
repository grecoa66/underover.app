import { requireUser } from "@/app/api/auth/getUser";
import { redirect } from "next/navigation";
import { getResultForLeaderboard } from "./actions";
import { SlateLeaderboard } from "@/app/(under-over)/components/SlateLeaderboard";

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

  return (
    <div>
      <h3>Slate {params.slate_id} Results</h3>
      <div className="">
        <SlateLeaderboard results={LeaderboardResults} />
      </div>
    </div>
  );
};

export default SlateResultsPage;
