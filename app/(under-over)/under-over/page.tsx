import { getCurrentUser } from "@/app/api/auth/getUser";
import { LinkButton } from "@/app/components/Button";
import { FaCogs } from "react-icons/fa";
import { getActiveSlates, getUpcomingSlates } from "./actions";
import { PublicSlates } from "../components/Slates";
import { PastSlatesButton } from "../components/PastSlatesButton";

const UnderOver = async () => {
  const currentUser = await getCurrentUser();

  const activeSlates = await getActiveSlates();
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
        <h3 className="mb-2 text-xl">Active Slates</h3>
        <PublicSlates slates={activeSlates} active={true} />
      </div>
      <div>
        <h3 className="mb-2 text-xl">Upcoming Slates</h3>
        <PublicSlates slates={upcomingSlates} open={true} />
      </div>
      <div>
        <h3 className="mb-2 text-xl">Past Slates</h3>
        <PastSlatesButton />
      </div>
    </div>
  );
};

export default UnderOver;
