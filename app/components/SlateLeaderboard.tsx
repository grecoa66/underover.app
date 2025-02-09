"use client";
import { LeaderboardResult, PickResult } from "@/app/types/picks";
import { FaAngleDown, FaAngleUp, FaTrophy } from "react-icons/fa";
import { UsersPicks } from "./Picks";
import { PickResultComponent } from "./PickResultComponent";
import { Accordion } from "@/app/components/Accordion";
import useScreenSize from "../hooks/useScreenSize";
import ordinalSuffix from "../utils/ordinalSuffix";
import { useState } from "react";
import { Button } from "./Button";

export const SlateLeaderboard = ({
  results,
}: {
  results: LeaderboardResult[];
}) => {
  const { isMediumDevice } = useScreenSize();
  return (
    <div>
      <h3 className="text-xl">Leaderboard</h3>
      <div className="mx-auto w-full max-w-[1000px]">
        {results.map((r) => (
          <div key={r.user_id}>
            {isMediumDevice ? (
              <MediumSlateLeaderboard result={r} />
            ) : (
              <div
                key={r.user_id}
                className="my-4 flex flex-col items-center justify-center rounded-lg border-2 border-everglade p-4 dark:border-mint "
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="mx-2 flex flex-row items-center text-xl text-everglade dark:text-mint">
                    {r.position === 1 && (
                      <span className="mr-2">
                        <FaTrophy className="text-gold-600" />
                      </span>
                    )}
                    {r.position === 0 ? null : ordinalSuffix(r.position)}
                  </p>

                  <p className="line-clamp-1 overflow-hidden text-ellipsis">
                    {r.picks[0].users.name}
                  </p>
                </div>
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
                <Accordion openedText="Hide Picks" closedText="Show Picks">
                  <UsersPicks picks={r.picks} />
                </Accordion>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MediumSlateLeaderboard = ({ result }: { result: LeaderboardResult }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      key={result.user_id}
      className="my-4 flex flex-col gap-2 rounded-lg border-2 border-everglade p-4 dark:border-mint"
    >
      <div className=" hidden flex-row items-center justify-evenly md:flex">
        <p className="mx-2 flex flex-row items-center text-xl text-everglade dark:text-mint">
          {result.position === 1 && (
            <span className="mr-2">
              <FaTrophy className="text-gold-600" />
            </span>
          )}
          {result.position === 0 ? null : ordinalSuffix(result.position)}
        </p>

        <p className="line-clamp-1 overflow-hidden text-ellipsis">
          {result.picks[0].users.name}
        </p>

        <div className="flex flex-row space-x-5">
          <PickResultComponent
            result={PickResult.Win}
            text={result.record.wins}
          />
          <PickResultComponent
            result={PickResult.Lose}
            text={result.record.losses}
          />
          <PickResultComponent text={result.record.active} />
        </div>
        <Button
          text={open ? "Hide Picks" : "Show Picks"}
          EndIcon={open ? FaAngleUp : FaAngleDown}
          onClick={() => setOpen(!open)}
        />
      </div>
      {open ? <UsersPicks picks={result.picks} /> : null}
    </div>
  );
};
