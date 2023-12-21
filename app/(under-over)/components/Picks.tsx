import { Dictionary, orderBy } from "lodash";
import { PickResult, PicksWithUserAndProp } from "@/app/types/picks";
import { PickResultComponent } from "./PickResultComponent";

/**
 * Given a dictionary of picks, display picks by user.
 * The dictionary keys are the id of the pick.
 * The dictionary values are the pick with the user and prop.
 */
export const PicksByUser = ({
  picks,
}: {
  picks: Dictionary<PicksWithUserAndProp>;
}) => {
  return (
    <>
      {Object.values(picks).map((result) => {
        const picksOrderedByPropId = orderBy(result, (r) => r.prop_id);

        return (
          <div
            key={picksOrderedByPropId[0].id}
            className="m-2 border-2 border-black p-2 dark:border-white"
          >
            <p className="text-underline text-xl">
              {picksOrderedByPropId[0].users.name}
            </p>
            {picksOrderedByPropId.map((pick) => (
              <div key={pick.id}>
                <p>{pick.props.player_name}</p>
                <p>
                  {pick.props.under_value} {pick.props.prop_type}
                </p>
                <p>Pick: {pick.selection}</p>
                <p>Result: {pick.props.prop_result || "Not Decided"}</p>
                <p>Pick Result: {pick.pick_result || "Not Decided"}</p>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

/**
 * Give a list of picks, render the selection with prop and user details
 */
export const UsersPicks = ({ picks }: { picks: PicksWithUserAndProp }) => {
  return (
    <div className="flex flex-col space-y-2">
      {picks.map((pick) => (
        <div
          key={pick.id}
          className="flex flex-row justify-between space-x-1 p-1 text-center odd:bg-gray-200"
        >
          <p className="w-1/3">{pick.props.player_name}</p>
          <p className="w-1/3">
            {pick.props.under_value} {pick.props.prop_type}
          </p>
          <div className="w-1/3">
            <PickResultComponent
              result={pick.pick_result as PickResult}
              text={pick.selection}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
