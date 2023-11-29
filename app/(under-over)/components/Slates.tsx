import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import { slates } from "@prisma/client";
import { FaEye, FaPen } from "react-icons/fa";
import { LinkButton } from "../../components/Button";

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
    <ManagePanel className="w-11/12 lg:w-2/3">
      <p className="border-b-2 border-everglade pb-2 dark:border-mint">
        {areSlatesActive ? "Active" : "Inactive"} Slates
      </p>
      {slates.map((slate) => (
        <div
          key={slate.id}
          className="my-2 flex flex-row items-center justify-between space-y-4 lg:space-y-0"
        >
          <Slate key={slate.id} slate={slate} />
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
            <ViewButton slateId={slate.id} />
            <EditButton slateId={slate.id} />
          </div>
        </div>
      ))}
    </ManagePanel>
  );
};

const ViewButton = ({ slateId }: { slateId: slates["id"] }) => {
  return (
    <LinkButton
      href={`/under-over/manage/slates/${slateId}`}
      text="View"
      StartIcon={FaEye}
    />
  );
};

const EditButton = ({ slateId }: { slateId: slates["id"] }) => {
  return (
    <LinkButton
      href={`/under-over/manage/slates/${slateId}/edit`}
      text="Edit"
      StartIcon={FaPen}
    />
  );
};

export default Slates;
