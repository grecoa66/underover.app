import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { DateTime } from "luxon";
import Link from "next/link";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

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
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="text-xl">Slate #{params.id}</h2>
        {/* TODO: Abstract Button */}
        <div className="flex flex-row space-x-4">
          <Link
            href="/under-over/manage/slates"
            className={
              "flex flex-row items-center justify-center space-x-2 rounded-lg border-2 border-mint p-2 hover:bg-mint hover:text-black"
            }
          >
            <FaArrowLeft />
            <button type="button">Back</button>
          </Link>
          <Link
            href={`/under-over/manage/slates/${params.id}/props/add`}
            className={
              "flex flex-row items-center justify-center space-x-2 rounded-lg border-2 border-mint p-2 hover:bg-mint hover:text-black"
            }
          >
            <FaPlus />
            <button type="button">Add</button>
          </Link>
        </div>
      </div>
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
      </div>

      {/* List of props */}
      {props.map((prop) => {
        return (
          <div key={prop.id}>
            <h3>Prop #{prop.id}</h3>
          </div>
        );
      })}
    </div>
  );
};
export default SlatePage;
