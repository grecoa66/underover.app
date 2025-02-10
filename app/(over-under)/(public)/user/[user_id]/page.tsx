import { requireUser } from "@/app/api/auth/getUser";
import { redirect } from "next/navigation";
import { getUserBettingDetails, getUserProfile } from "./actions";
import { ClientOnly } from "@/app/components/ClientOnly";
import Link from "next/link";
import { getResultForLeaderboard } from "../../slates/[slate_id]/results/actions";
import { PickResultComponent } from "@/app/components/PickResultComponent";
import { PickResult } from "@/app/types/picks";

const UserPage = async ({ params }: { params: { user_id: string } }) => {
  // Get the logged in user
  const currentUser = await requireUser().catch(() => {
    redirect("/api/auth/signin");
  });
  // Ensure the user is an admin, or they're looking at their own profile
  if (
    currentUser.role !== "admin" &&
    currentUser.id !== Number(params.user_id)
  ) {
    throw Error("Unauthorized");
  }

  const userProfile = await getUserProfile({
    userId: params.user_id,
  });

  const bets = await getUserBettingDetails({
    userId: params.user_id,
  });

  const completedSlates = bets.slates.filter((slate) => slate.is_complete);
  const completedSlatesResults = await Promise.all(
    completedSlates.map(async (slate) => {
      const LeaderboardResults = await getResultForLeaderboard({
        slate_id: Number(slate.id),
      });
      const userResult = LeaderboardResults.filter(
        (result) => result.user_id === params.user_id,
      );
      return { slate, userResult };
    }),
  );

  const activeSlates = bets.slates.filter((slate) => slate.is_active);
  const otherSlates = bets.slates.filter(
    (slate) =>
      completedSlates.includes(slate) === false &&
      activeSlates.includes(slate) === false,
  );

  return (
    <div className="m-4 flex flex-col gap-4">
      <h1 className="text-2xl">{userProfile.name}</h1>
      <h2 className="text-xl md:mx-4">Completed Slates</h2>
      <div className="flex flex-col gap-4 md:mx-4">
        {completedSlates
          .sort(
            (a, b) =>
              new Date(a.start_date).getTime() -
              new Date(b.start_date).getTime(),
          )
          .map((slate) => (
            <div
              key={slate.id}
              className="rounded-lg border-2 border-everglade p-4 dark:border-mint"
            >
              <Link href={`/slates/${slate.id}/results`}>
                <h3 className="text-lg hover:text-everglade hover:underline dark:hover:text-mint">
                  {slate.title}
                </h3>
              </Link>
              <p>League: {slate.league.toUpperCase()}</p>
              <ClientOnly>
                <p>
                  Start Date: {new Date(slate.start_date).toLocaleDateString()}
                </p>
              </ClientOnly>
              <div className="flex flex-row gap-4">
                <p>Results:</p>
                <div className="flex flex-row space-x-5">
                  <PickResultComponent
                    result={PickResult.Win}
                    text={
                      completedSlatesResults.find(
                        (slateResult) => slate.id === slateResult.slate.id,
                      )?.userResult[0].record.wins || 0
                    }
                  />
                  <PickResultComponent
                    result={PickResult.Lose}
                    text={
                      completedSlatesResults.find(
                        (slateResult) => slate.id === slateResult.slate.id,
                      )?.userResult[0].record.losses || 0
                    }
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      {activeSlates.length > 0 ? (
        <>
          <h2>Active Slates</h2>
          <div className="flex flex-col gap-4">
            {activeSlates
              .sort(
                (a, b) =>
                  new Date(a.start_date).getTime() -
                  new Date(b.start_date).getTime(),
              )
              .map((slate) => (
                <div
                  key={slate.id}
                  className="rounded-lg border-2 border-everglade p-4 dark:border-mint"
                >
                  <Link href={`/slates/${slate.id}/results`}>
                    <h3 className="hover:text-everglade dark:hover:text-mint">
                      {slate.title}
                    </h3>
                  </Link>
                  <ClientOnly>
                    <p>
                      Start Date:{" "}
                      {new Date(slate.start_date).toLocaleDateString()}
                    </p>
                  </ClientOnly>
                  <p>League: {slate.league.toUpperCase()}</p>
                </div>
              ))}
          </div>
        </>
      ) : null}
      {otherSlates.length > 0 ? (
        <>
          <h2>Other Slates</h2>
          <div className="flex flex-col gap-4">
            {activeSlates
              .sort(
                (a, b) =>
                  new Date(a.start_date).getTime() -
                  new Date(b.start_date).getTime(),
              )
              .map((slate) => (
                <div
                  key={slate.id}
                  className="rounded-lg border-2 border-everglade p-4 dark:border-mint"
                >
                  <Link href={`/slates/${slate.id}/results`}>
                    <h3 className="hover:text-everglade dark:hover:text-mint">
                      {slate.title}
                    </h3>
                  </Link>
                  <ClientOnly>
                    <p>
                      Start Date:{" "}
                      {new Date(slate.start_date).toLocaleDateString()}
                    </p>
                  </ClientOnly>
                  <p>League: {slate.league.toUpperCase()}</p>
                </div>
              ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserPage;
