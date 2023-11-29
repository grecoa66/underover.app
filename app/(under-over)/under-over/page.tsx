import { getCurrentUser } from "@/app/api/auth/getUser";
import { LinkButton } from "@/app/components/Button";
import { FaCogs } from "react-icons/fa";
import { getUpcomingSlates } from "./actions";
import ManagePanel from "../components/ManagePanel";
import { League } from "@/app/types/slates";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

const UnderOver = async () => {
  const currentUser = await getCurrentUser();

  const upcomingSlates = await getUpcomingSlates();

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row justify-between">
        <div>Let&apos;s bet some unders and overs</div>
        {currentUser?.role === "admin" && (
          <LinkButton
            href="/under-over/manage"
            text="Manage"
            StartIcon={FaCogs}
          />
        )}
      </div>
      <div>
        <h3 className="mb-2 text-xl">Upcoming Slates</h3>
        <div className="rounded-lg border-2 border-mint p-2">
          {upcomingSlates.map((slate, index) => {
            return (
              <div
                key={slate.id}
                className={twMerge(
                  "p-2",
                  index < upcomingSlates.length - 1 && "border-b-2 border-mint",
                )}
              >
                <p>Slate #{slate.id}</p>
                <p>
                  {slate.league} {slate.league === League.NFL && slate.nfl_week}
                </p>
                <p>
                  Starts in{" "}
                  {Math.floor(
                    DateTime.fromJSDate(slate.start_date).diffNow().as("days"),
                  )}{" "}
                  days
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UnderOver;
