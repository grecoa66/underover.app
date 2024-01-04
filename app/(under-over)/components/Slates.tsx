import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import { slates } from "@prisma/client";
import { FaAngleRight, FaEye, FaPen } from "react-icons/fa";
import { LinkButton } from "../../components/Button";
import { TimeUntilStart } from "./TimeUntilStart";

const ViewButton = ({ slate_id }: { slate_id: slates["id"] }) => {
  return (
    <LinkButton
      href={`/under-over/manage/slates/${slate_id}`}
      text="View"
      StartIcon={FaEye}
    />
  );
};

const EditButton = ({ slate_id }: { slate_id: slates["id"] }) => {
  return (
    <LinkButton
      href={`/under-over/manage/slates/${slate_id}/edit`}
      text="Edit"
      StartIcon={FaPen}
    />
  );
};

const Slate = ({ slate }: { slate: slates }) => {
  return (
    <div className="flex flex-col justify-center">
      <p className="text-lg text-everglade underline">Slate # {slate.id}</p>
      <div className="flex flex-row">
        <p>
          League {slate.league.toUpperCase()}{" "}
          {slate.league === "nfl" && <span>- Week {slate.nfl_week}</span>}
        </p>
      </div>
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
              <ViewButton slate_id={slate.id} />
              <EditButton slate_id={slate.id} />
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
  active = false,
  open = false,
}: {
  slates: slates[];
  active?: boolean;
  open?: boolean;
}) => {
  return (
    <div className="rounded-lg border-2 border-everglade p-2 dark:border-mint">
      {slates.length > 0 ? (
        slates.map((slate, index) => {
          return (
            <div key={slate.id}>
              <div className={"flex flex-row items-center justify-between"}>
                <div>
                  <Slate slate={slate} />
                  {!active && <TimeUntilStart date={slate.start_date} />}
                </div>
                {open ? (
                  <LinkButton
                    text="Make your picks"
                    className="h-fit w-32 lg:w-fit"
                    variant="inverse"
                    EndIcon={FaAngleRight}
                    href={`/under-over/slates/${slate.id}/picks`} // TODO: Maybe rethink this route
                  />
                ) : (
                  <LinkButton
                    text={active ? "Live Results" : "Results"}
                    className="h-fit w-32 lg:w-fit"
                    variant="inverse"
                    EndIcon={FaAngleRight}
                    href={`/under-over/slates/${slate.id}/results`} // TODO: Maybe rethink this route
                  />
                )}
              </div>
              {slates.length > 1 && index < slates.length - 1 && (
                <div className="my-2 border-b-2 border-everglade dark:border-mint" />
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
