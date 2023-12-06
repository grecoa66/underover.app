import { requireUser } from "@/app/api/auth/getUser";
import { redirect } from "next/navigation";
import { getSlateResults } from "./actions";
import { orderBy } from "lodash";

const SlateResultsPage = async ({
  params,
}: {
  params: { slate_id: number };
}) => {
  const user = await requireUser().catch(() => {
    redirect("/api/auth/signin");
  });

  const slateResults = await getSlateResults(params.slate_id);

  return (
    <div>
      <h3>Slate {params.slate_id} Results</h3>
      <div className="">
        {Object.entries(slateResults).map((result) => {
          const userId = result[0];
          const picks = orderBy(result[1], (r) => r.prop_id);

          console.log("entries: ", userId, picks);

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
                </>
              ))}
              <p></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlateResultsPage;
