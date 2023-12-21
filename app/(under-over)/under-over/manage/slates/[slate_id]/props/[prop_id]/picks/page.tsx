import { PicksByUser } from "@/app/(under-over)/components/Picks";
import { getResultForProp } from "@/app/(under-over)/under-over/(public)/slates/[slate_id]/results/actions";

const ManagePicksPage = async ({
  params,
}: {
  params: { slate_id: string; prop_id: string; bet_id: string };
}) => {
  const picks = await getResultForProp({ prop_id: Number(params.prop_id) });

  return (
    <div>
      <h2>Picks for Prop #{params.prop_id}</h2>
      <div className="">
        <PicksByUser picks={picks} />
      </div>
    </div>
  );
};

export default ManagePicksPage;
