import { orderBy } from "lodash";
import { getResultOfPicks } from "../under-over/(public)/slates/[slate_id]/results/actions";

type PicksByUserType = Awaited<ReturnType<typeof getResultOfPicks>>;

export const PicksByUser = ({ picks }: { picks: PicksByUserType }) => {
  return (
    <>
      {Object.values(picks).map((result) => {
        const picksByUser = orderBy(result, (r) => r.prop_id);

        return (
          <div
            key={picksByUser[0].id}
            className="m-2 border-2 border-black p-2 dark:border-white"
          >
            <p className="text-underline text-xl">
              {picksByUser[0].users.name}
            </p>
            {picksByUser.map((pick) => (
              <div key={pick.id}>
                <p>{pick.props.player_name}</p>
                <p>
                  {pick.props.under_value} {pick.props.prop_type}
                </p>
                <p>Pick: {pick.selection}</p>
                <p>Result: {pick.props.prop_result || "Not Decided"}</p>
                <p>Pick Result: {pick.pick_result || "Not Decided"}</p>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export const LeaderboardForSlate = ({ picks }: { picks: PicksByUserType }) => {
  return (
    <div>
      <h3 className="text-xl">Leaderboard</h3>
      {Object.values(picks).map((result) => {
        const picksByUser = orderBy(result, (r) => r.prop_id);
        return (
          <div key={picksByUser[0].users.id}>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};
