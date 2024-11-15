import { LeaderboardResult, PickResult } from "@/app/types/picks";
import { FaTrophy } from "react-icons/fa";
import { UsersPicks } from "./Picks";
import { PickResultComponent } from "./PickResultComponent";
import { Accordion } from "@/app/components/Accordion";

export const SlateLeaderboard = ({
  results,
}: {
  results: LeaderboardResult[];
}) => (
  <div>
    <h3 className="text-xl">Leaderboard</h3>
    <div className="max-w-80 ">
      {results.map((r) => (
        <div
          key={r.user_id}
          className="my-4 flex flex-col rounded-lg border-2 border-everglade p-4 dark:border-mint"
        >
          <div className="flex flex-row">
            <p className="mx-2 flex w-1/4 flex-row items-center text-xl text-everglade dark:text-mint">
              {r.position === 0 ? null : r.position}
              {r.position === 1 && (
                <span className="ml-2">
                  <FaTrophy className="text-gold-600" />
                </span>
              )}
            </p>
            <div className="flex w-3/4 flex-col items-center ">
              <p className="line-clamp-1 overflow-hidden text-ellipsis">
                {r.picks[0].users.name}
              </p>

              <div className="flex flex-row space-x-5">
                <PickResultComponent
                  result={PickResult.Win}
                  text={r.record.wins}
                />
                <PickResultComponent
                  result={PickResult.Lose}
                  text={r.record.losses}
                />
                <PickResultComponent text={r.record.active} />
              </div>
            </div>
          </div>
          <Accordion openedText="Hide Picks" closedText="Show Picks">
            <UsersPicks picks={r.picks} />
          </Accordion>
        </div>
      ))}
    </div>
  </div>
);
