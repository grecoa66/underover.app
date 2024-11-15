import { PicksByUser } from "@/app/components/Picks";
import { getResultsForProp } from "@/app/(over-under)/(public)/slates/[slate_id]/results/actions";

const ManagePicksPage = async ({
  params,
}: {
  params: { slate_id: string; prop_id: string; bet_id: string };
}) => {
  const picks = await getResultsForProp({ prop_id: Number(params.prop_id) });

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
