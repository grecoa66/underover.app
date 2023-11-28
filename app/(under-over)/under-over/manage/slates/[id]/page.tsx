import ManageHeader from "@/app/(under-over)/components/ManageHeader";
import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import ManageWrapper from "@/app/(under-over)/components/ManageWrapper";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { DateTime } from "luxon";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

const SlatePage = async ({ params }: { params: { id: string } }) => {
  // Page requires admin access
  await requireAdmin();

  const slate = await prisma.slates.findUnique({
    where: {
      id: Number(params.id),
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
      slate_id: Number(params.id),
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }

  return (
    <ManageWrapper>
      <ManageHeader
        title={`Slate #${params.id}`}
        backLink="/under-over/manage/slates"
        backText="Slates"
        addLink={`/under-over/manage/slates/${params.id}/props/add`}
      />
      {/* Slate data */}
      <div>
        {user && (
          <p>
            Created By: {user?.name} ({user?.id})
          </p>
        )}
        <p>
          Start Date:{" "}
          {DateTime.fromJSDate(slate.start_date, {
            zone: "utc",
          }).toLocaleString()}
        </p>
        <p>{slate.league}</p>
        <p>
          End Date:{" "}
          {DateTime.fromJSDate(slate.end_date, {
            zone: "utc",
          }).toLocaleString()}
        </p>
        <p>
          Is Active?{" "}
          {slate.is_active ? (
            <span className="text-aero-600">Yes</span>
          ) : (
            <span>No</span>
          )}
        </p>
        <p>
          Is Locked?{" "}
          {slate.is_locked ? (
            <span className="text-aero-600">Yes</span>
          ) : (
            <span>No</span>
          )}
        </p>
        <p>
          is Complete?{" "}
          {slate.is_complete ? (
            <span className="text-aero-600">Yes</span>
          ) : (
            <span>No</span>
          )}
        </p>
        <p>
          Created At:{" "}
          {DateTime.fromJSDate(slate.created_at)
            .toLocal()
            .toFormat("t MM-dd-yyyy")}
        </p>
        <p>
          Last Modified:{" "}
          {DateTime.fromJSDate(slate.modified_at)
            .toLocal()
            .toFormat("t MM-dd-yyyy")}
        </p>

        <Link
          href={`/under-over/manage/slates/${params.id}/edit`}
          className={
            "flex h-8 w-24 flex-row items-center justify-center space-x-2 rounded-lg border-2 border-mint p-2 hover:bg-mint hover:text-black"
          }
        >
          <FaPen />
          <button type="button">Edit</button>
        </Link>
      </div>

      {/* List of props */}
      {props.map((prop) => {
        return (
          <ManagePanel key={prop.id}>
            <h3 className="text-lg">Prop #{prop.id}</h3>
            {prop.player_name && <p>Player: {prop.player_name}</p>}
            {prop.team_name && <p>Team: {prop.team_name}</p>}
            <p>Matchup: {prop.team_matchup}</p>
            {prop.start_date && (
              <p>
                Start Date:{" "}
                {DateTime.fromJSDate(prop.start_date, {
                  zone: "utc",
                }).toLocaleString()}
              </p>
            )}
            {prop.end_date && (
              <p>
                End Date:{" "}
                {DateTime.fromJSDate(prop.end_date, {
                  zone: "utc",
                }).toLocaleString()}
              </p>
            )}
            {prop.game_start_time && (
              <p>
                Game Start Time:{" "}
                {DateTime.fromJSDate(prop.game_start_time)
                  .toLocal()
                  .toFormat("t MM-dd-yyyy")}
              </p>
            )}
            <p>Prop Type: {prop.prop_type}</p>
            <p>Prop Result: {prop.prop_result}</p>
            <p>Under Value: {prop.under_value}</p>
            <p>Under Price: {prop.under_price}</p>
            <p>Over Value: {prop.over_value}</p>
            <p>Over Price: {prop.over_price}</p>
          </ManagePanel>
        );
      })}
    </ManageWrapper>
  );
};
export default SlatePage;
