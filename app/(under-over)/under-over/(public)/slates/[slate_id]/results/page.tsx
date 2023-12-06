import { requireUser } from "@/app/api/auth/getUser";
import { redirect } from "next/navigation";
import { getResultOfPicks } from "./actions";
import { PicksByUser } from "@/app/(under-over)/components/Picks";

const SlateResultsPage = async ({
  params,
}: {
  params: { slate_id: string };
}) => {
  const user = await requireUser().catch(() => {
    redirect("/api/auth/signin");
  });

  const slateResults = await getResultOfPicks({
    slate_id: Number(params.slate_id),
  });

  return (
    <div>
      <h3>Slate {params.slate_id} Results</h3>
      <div className="">
        <PicksByUser picks={slateResults} />
      </div>
    </div>
  );
};

export default SlateResultsPage;
