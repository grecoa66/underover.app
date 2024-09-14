import { getUserPicksForSlate } from "../slates/[slate_id]/picks/actions";
import { getResultForLeaderboard } from "../slates/[slate_id]/results/actions";
import { getSlatesForUser, getUser } from "./actions";

const ProfilePage = async () => {
  const user = await getUser();
  if (!user) {
    return <div>User not found</div>;
  }

  const slates = await getSlatesForUser(user.id);

  console.log("slates: ", slates);

  const userResultsForSlates = await Promise.all(
    slates.map(async (slate) => {
      const resultsForSlate = await getUserPicksForSlate(slate.id);
      const LeaderboardResults = await getResultForLeaderboard({
        slate_id: slate.id,
      });
      return {
        slate,
        results: resultsForSlate,
        leaderboard: LeaderboardResults.find((lr) => lr.user_id === user.id),
      };
    }),
  );

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h3>Profile</h3>
        <h4>{user.name}</h4>
      </div>
      <div className="flex flex-row">
        <p>{user.email}</p>
        <p>{user.id}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Slates</h3>
        <div>
          {userResultsForSlates.map((result) => (
            <>
              <div className="text-lg">{result.slate.title}</div>
              <div className="border-2 border-everglade-400 dark:border-mint-600 flex flex-col sm:flex-row gap-4 p-4">
                <p>
                  Finishing Position:{" "}
                  {result.leaderboard && result.leaderboard?.position > 0
                    ? result.leaderboard?.position
                    : "Not Decided"}
                </p>
                <p>
                  Correct Picks:{" "}
                  {result.results.picks.reduce((acc, curr) => {
                    if (curr.pick_result === "win") {
                      return acc + 1;
                    }
                    return acc;
                  }, 0)}
                </p>
                <p>
                  Incorrect Picks:{" "}
                  {result.results.picks.reduce((acc, curr) => {
                    if (curr.pick_result === "lose") {
                      return acc + 1;
                    }
                    return acc;
                  }, 0)}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
