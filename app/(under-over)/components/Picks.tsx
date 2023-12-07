import { orderBy } from "lodash";
import { getResultOfPicks } from "../under-over/(public)/slates/[slate_id]/results/actions";
import { LeaderboardResult, PickResult } from "@/app/types/picks";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { FaCircleXmark, FaTrophy } from "react-icons/fa6";

type PicksByUserType = Awaited<ReturnType<typeof getResultOfPicks>>;

export const PicksByUser = ({ picks }: { picks: PicksByUserType }) => {
  return (
    <>
      {Object.values(picks).map((result) => {
        const picksOrderedByPropId = orderBy(result, (r) => r.prop_id);

        return (
          <div
            key={picksOrderedByPropId[0].id}
            className="m-2 border-2 border-black p-2 dark:border-white"
          >
            <p className="text-underline text-xl">
              {picksOrderedByPropId[0].users.name}
            </p>
            {picksOrderedByPropId.map((pick) => (
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

export const LeaderboardForSlate = ({
  results,
}: {
  results: { [key: string]: LeaderboardResult[] };
}) => {
  return (
    <div>
      <h3 className="text-xl">Leaderboard</h3>
      {Object.entries(results).map((r) => {
        return r[1].map((x) => {
          const place = Number(r[0]) + 1;
          return (
            <div key={x.user_id} className="my-4">
              <p className="flex flex-row items-center space-x-2">
                <span className="text-xl">
                  {place} {x.picks[0].users.name}
                </span>
                {place === 1 && (
                  <span>
                    <FaTrophy className="text-gold-600" />
                  </span>
                )}
              </p>
              <div className="flex flex-row space-x-2">
                <p className="flex flex-row items-center space-x-2">
                  <FaCheckCircle /> <span>{x.record.wins}</span>
                </p>
                <p className="flex flex-row items-center space-x-2">
                  <FaCircleXmark /> <span>{x.record.losses}</span>
                </p>
                <p className="flex flex-row items-center space-x-2">
                  <FaHourglassHalf /> <span>{x.record.active}</span>
                </p>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};
