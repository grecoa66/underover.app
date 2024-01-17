import { LinkButton } from "@/app/components/Button";
import {
  DateInTimezone,
  SimpleDateDisplay,
} from "@/app/(under-over)/components/DateInTimezone";
import ManageHeader from "@/app/(under-over)/components/ManageHeader";
import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import ManageWrapper from "@/app/(under-over)/components/ManageWrapper";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { FaCoins, FaEye, FaPen, FaTrash } from "react-icons/fa";
import { DeletePropButton } from "@/app/(under-over)/components/DeleteButton";
import { SettlePropButtons } from "@/app/(under-over)/components/SettlePickButtons";

const SlatePage = async ({ params }: { params: { slate_id: string } }) => {
  // Page requires admin access
  await requireAdmin();

  const slate = await prisma.slates.findUnique({
    where: {
      id: Number(params.slate_id),
      deleted_at: null,
    },
  });

  const user = await prisma.users.findUnique({
    where: {
      id: Number(slate?.created_by),
    },
    select: {
      id: true,
      name: true,
    },
  });
  // Fetch all props for slate
  const props = await prisma.props.findMany({
    where: {
      slate_id: Number(params.slate_id),
      deleted_at: null,
    },
    orderBy: {
      id: "asc",
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }

  return (
    <ManageWrapper>
      <ManageHeader
        title={`${slate.title}`}
        backLink="/under-over/manage/slates"
        backText="Slates"
        addLink={`/under-over/manage/slates/${params.slate_id}/props/add`}
        addText="Add Prop"
      />
      {/* Slate data */}
      <div className="space-y-2">
        <div>
          <p>Slate {slate.id}</p>
          {user && (
            <p>
              Created By: {user?.name} ({user?.id})
            </p>
          )}
          <p>
            Start Date: <SimpleDateDisplay date={slate.start_date} />
          </p>
          <p>League {slate.league}</p>
          <p>
            End Date: <SimpleDateDisplay date={slate.end_date} />
          </p>
          <p>
            Is Active?{" "}
            {slate.is_active ? (
              <span className="text-everglade dark:text-aero-600">Yes</span>
            ) : (
              <span>No</span>
            )}
          </p>
          <p>
            Is Public?{" "}
            {slate.is_public ? (
              <span className="text-everglade dark:text-aero-600">Yes</span>
            ) : (
              <span>No</span>
            )}
          </p>
          <p>
            Is Locked?{" "}
            {slate.is_locked ? (
              <span className="text-everglade dark:text-aero-600">Yes</span>
            ) : (
              <span>No</span>
            )}
          </p>
          <p>
            is Complete?{" "}
            {slate.is_complete ? (
              <span className="text-everglade dark:text-aero-600">Yes</span>
            ) : (
              <span>No</span>
            )}
          </p>
          <p>
            Created At: <DateInTimezone date={slate.created_at} />
          </p>
          <p>
            Last Modified: <DateInTimezone date={slate.modified_at} />
          </p>
        </div>
        <LinkButton
          href={`/under-over/manage/slates/${params.slate_id}/edit`}
          text="Edit"
          StartIcon={FaPen}
          className="w-28"
        />
      </div>

      {/* List of props */}
      {props.map((prop) => {
        return (
          <ManagePanel key={prop.id} className="space-y-2">
            <div>
              <h3 className="text-lg">Prop #{prop.id}</h3>
              {prop.player_name && <p>Player: {prop.player_name}</p>}
              {prop.players_team && <p>Team: {prop.players_team}</p>}
              <p>
                Matchup: {prop.away_team} @ {prop.home_team}
              </p>
              {prop.start_date && (
                <p>
                  Start Date: <SimpleDateDisplay date={prop.start_date} />
                </p>
              )}
              {prop.end_date && (
                <p>
                  End Date: <SimpleDateDisplay date={prop.end_date} />
                </p>
              )}
              {prop.game_start_time && (
                <p>
                  Game Start Time:{" "}
                  <DateInTimezone date={prop.game_start_time} />
                </p>
              )}
              <p>Prop Type: {prop.prop_type}</p>
              <p>Prop Result: {prop.prop_result}</p>
              <p>Prop Value: {prop.prop_value}</p>
              <p>Over Price: {prop.over_price}</p>
              <p>Under Price: {prop.under_price}</p>
            </div>
            <div className="flex flex-row space-x-2">
              <SettlePropButtons prop={prop} />
            </div>
            <div className="flex flex-row space-x-2">
              <LinkButton
                href={`/under-over/manage/slates/${params.slate_id}/props/${prop.id}/picks`}
                text="Picks"
                StartIcon={FaCoins}
                className=""
              />
              <LinkButton
                href={`/under-over/manage/slates/${params.slate_id}/props/${prop.id}/edit`}
                text="Edit"
                StartIcon={FaPen}
                className="w-28"
              />
              <DeletePropButton prop_id={prop.id} slate_id={slate.id} />
            </div>
          </ManagePanel>
        );
      })}
    </ManageWrapper>
  );
};
export default SlatePage;
