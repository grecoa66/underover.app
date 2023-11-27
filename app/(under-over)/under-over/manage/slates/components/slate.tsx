import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import { slates } from "@prisma/client";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

const Slate = ({ slate }: { slate: slates }) => {
  return (
    <div className="flex flex-col justify-center p-2">
      <p>Slate # {slate.id}</p>
      <p>League {slate.league}</p>{" "}
      {slate.league === "nfl" && <p>Week {slate.nfl_week}</p>}
    </div>
  );
};

const Slates = ({
  slates,
  areSlatesActive,
}: {
  slates: slates[];
  areSlatesActive: boolean;
}) => {
  return (
    <ManagePanel className="w-5/6 lg:w-1/3">
      <p className="border-b-2 border-mint pb-2">
        {areSlatesActive ? "Active" : "Inactive"} Slates
      </p>
      {slates.map((slate) => (
        <div
          key={slate.id}
          className="my-2 flex flex-row items-center justify-between"
        >
          <Slate key={slate.id} slate={slate} />
          <EditButton slateId={slate.id} />
        </div>
      ))}
    </ManagePanel>
  );
};

const EditButton = ({ slateId }: { slateId: slates["id"] }) => {
  return (
    <Link
      href={`/under-over/manage/slates/${slateId}/edit`}
      className={
        "flex h-8 flex-row items-center justify-center space-x-2 rounded-lg p-2 hover:bg-mint hover:text-black"
      }
    >
      <FaPen />
      <button type="button">Edit</button>
    </Link>
  );
};

export { Slates };
