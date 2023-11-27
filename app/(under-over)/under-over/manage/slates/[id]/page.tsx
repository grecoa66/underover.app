import ManageHeader from "@/app/(under-over)/components/ManageHeader";
import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import ManageWrapper from "@/app/(under-over)/components/ManageWrapper";
import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { DateTime } from "luxon";

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
        addLink={`/under-over/manage/slates/${params.id}/props/add`}
      />
      {/* Slate data */}
      <ManagePanel>
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
      </ManagePanel>

      {/* List of props */}
      {props.map((prop) => {
        return (
          <ManagePanel key={prop.id}>
            <h3>Prop #{prop.id}</h3>
          </ManagePanel>
        );
      })}
    </ManageWrapper>
  );
};
export default SlatePage;
