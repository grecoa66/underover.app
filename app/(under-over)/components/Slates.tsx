import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import { slates } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { FaEye, FaPen } from "react-icons/fa";
import { LinkButton } from "../../components/Button";
import { TimeUntilStart } from "./TimeUntilStart";

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

const Slate = ({ slate }: { slate: slates }) => {
  return (
    <div className="flex flex-col justify-center">
      <p className="text-lg">Slate # {slate.id}</p>
      <p>League {slate.league}</p>{" "}
      {slate.league === "nfl" && <p>Week {slate.nfl_week}</p>}
    </div>
  );
};

const ManageSlates = ({
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
      {slates.length > 0 ? (
        slates.map((slate) => (
          <div
            key={slate.id}
            className="my-2 flex flex-row items-center justify-between space-y-4 p-2 lg:space-y-0"
          >
            <Slate key={slate.id} slate={slate} />
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
              <ViewButton slateId={slate.id} />
              <EditButton slateId={slate.id} />
            </div>
          </div>
        ))
      ) : (
        <p>There are no active slates</p>
      )}
    </ManagePanel>
  );
};

const PublicSlates = ({
  slates,
  displayDaysUntilStart = false,
}: {
  slates: slates[];
  displayDaysUntilStart?: boolean;
}) => {
  return (
    <div className="rounded-lg border-2 border-mint p-2">
      {slates.length > 0 ? (
        slates.map((slate, index) => {
          return (
            <div
              key={slate.id}
              className={twMerge(
                "p-2",
                slates.length > 1 &&
                  index < slates.length - 1 &&
                  "border-b-2 border-mint",
              )}
            >
              <Slate slate={slate} />
              {displayDaysUntilStart && (
                <TimeUntilStart date={slate.start_date} />
              )}
            </div>
          );
        })
      ) : (
        <p>There are no active slates</p>
      )}
    </div>
  );
};

export { ManageSlates, PublicSlates };
