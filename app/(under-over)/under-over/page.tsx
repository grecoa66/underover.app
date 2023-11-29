import { getCurrentUser } from "@/app/api/auth/getUser";
import { LinkButton } from "@/app/components/Button";
import { FaCogs } from "react-icons/fa";

const UnderOver = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col">
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
    </div>
  );
};

export default UnderOver;
