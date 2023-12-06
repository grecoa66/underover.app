import { orderBy } from "lodash";
import { deletePick, getPropResults } from "./actions";
import { DeletePickButton } from "@/app/(under-over)/components/DeleteButton";

const ManagePicksPage = async ({
  params,
}: {
  params: { slate_id: string; prop_id: string; bet_id: string };
}) => {
  const picks = await getPropResults(Number(params.prop_id));

  return (
    <div>
      <h2>Picks for Prop #{params.prop_id}</h2>
      <div className="">
        {Object.values(picks).map((result) => {
          const picks = orderBy(result, (r) => r.prop_id);

          return (
            <div className="m-2 border-2 border-black p-2 dark:border-white">
              <p className="text-underline text-xl">{picks[0].users.name}</p>
              {picks.map((pick) => (
                <>
                  <p>{pick.props.player_name}</p>
                  <p>
                    {pick.props.under_value} {pick.props.prop_type}
                  </p>
                  <p>Pick: {pick.selection}</p>
                  <p>Result: {pick.props.prop_result || "Not Decided"}</p>
                  <DeletePickButton pick_id={pick.id} />
                </>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManagePicksPage;
