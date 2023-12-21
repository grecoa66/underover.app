import { Dictionary, orderBy } from "lodash";
import {
  LeaderboardResult,
  PickResult,
  PicksWithUserAndProp,
} from "@/app/types/picks";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { FaCircleArrowRight, FaCircleXmark, FaTrophy } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

/**
 * Given a dictionary of picks, display picks by user.
 * The dictionary keys are the id of the pick.
 * The dictionary values are the pick with the user and prop.
 */
export const PicksByUser = ({
  picks,
}: {
  picks: Dictionary<PicksWithUserAndProp>;
}) => {
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

export const PickResultComponent = ({
  result,
  text,
  className,
}: {
  result?: PickResult;
  text: string | number;
  className?: string;
}) => (
  <div
    className={twMerge(
      "flex flex-row items-center justify-center space-x-2",
      className,
    )}
  >
    {result === PickResult.Win && (
      <>
        <FaCheckCircle className="text-everglade-300" /> <p>{text}</p>
      </>
    )}
    {result === PickResult.Lose && (
      <>
        <FaCircleXmark className="text-red-400" /> <p>{text}</p>
      </>
    )}
    {result === PickResult.Push && (
      <>
        <FaCircleArrowRight className="text-gray-400" /> <p>{text}</p>
      </>
    )}
    {!result && (
      <>
        <FaHourglassHalf className="text-gray-400" /> <p>{text}</p>
      </>
    )}
  </div>
);

/**
 * Give a list of picks, render the selection with prop and user details
 */
export const UsersPicks = ({ picks }: { picks: PicksWithUserAndProp }) => {
  return (
    <div className="flex flex-col space-y-2">
      {picks.map((pick) => (
        <div
          key={pick.id}
          className="flex flex-row justify-between space-x-1 p-1 text-center odd:bg-gray-200"
        >
          <p className="w-1/3">{pick.props.player_name}</p>
          <p className="w-1/3">
            {pick.props.under_value} {pick.props.prop_type}
          </p>
          <div className="w-1/3">
            <PickResultComponent
              result={pick.pick_result as PickResult}
              text={pick.selection}
            />
          </div>
        </div>
      ))}
    </div>
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
      <div className="max-w-80 ">
        {Object.entries(results).map((r) => {
          const leaderboardPosition = Number(r[0]) + 1;
          return r[1].map((x) => {
            return (
              <div
                key={x.user_id}
                className="my-4 flex flex-col rounded-lg border-2 border-everglade p-4 dark:border-mint"
              >
                <div className="flex flex-row">
                  <p className="mx-2 flex w-1/4 flex-row items-center text-xl text-everglade dark:text-mint">
                    {leaderboardPosition}
                    {leaderboardPosition === 1 && (
                      <span className="ml-2">
                        <FaTrophy className="text-gold-600" />
                      </span>
                    )}
                  </p>
                  <div className="flex w-3/4 flex-col items-center ">
                    <p className="line-clamp-1 overflow-hidden text-ellipsis">
                      {x.picks[0].users.name}
                    </p>

                    <div className="flex flex-row space-x-5">
                      <PickResultComponent
                        result={PickResult.Win}
                        text={x.record.wins}
                      />
                      <PickResultComponent
                        result={PickResult.Lose}
                        text={x.record.losses}
                      />
                      <PickResultComponent text={x.record.active} />
                    </div>
                  </div>
                </div>
                {/* TODO: put this in a togglable drawer */}
                <UsersPicks picks={x.picks} />
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
