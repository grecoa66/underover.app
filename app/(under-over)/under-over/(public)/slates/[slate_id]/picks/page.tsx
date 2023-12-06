import { requireUser } from "@/app/api/auth/getUser";
import { redirect } from "next/navigation";
import { getUserPicksForSlate } from "./actions";
import { PicksForm } from "./PicksForm";

const PicksPage = async ({ params }: { params: { slate_id: number } }) => {
  const user = await requireUser().catch(() => {
    redirect("/api/auth/signin");
  });

  const { props, picks } = await getUserPicksForSlate(Number(params.slate_id));

  return (
    <div className="h-full overflow-hidden">
      <PicksForm slate_id={params.slate_id} props={props} />
      {/* {props.map((prop) => (
        <div key={prop.id} className="border-2 border-everglade">
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
              Game Start Time: <DateInTimezone date={prop.game_start_time} />
            </p>
          )}
          <p>Prop Type: {prop.prop_type}</p>
          <p>Prop Result: {prop.prop_result}</p>
          <p>Under Value: {prop.under_value}</p>
          <p>Under Price: {prop.under_price}</p>
          <p>Over Value: {prop.over_value}</p>
          <p>Over Price: {prop.over_price}</p>
        </div>
      ))}
      {picks.map((pick) => (
        <div key={pick.id} className="border-2 border-mint-700">
          <p>Prop #{pick.prop_id}</p>
          <p>Selection: {pick.selection}</p>
          {pick.pick_result && <p>Result: {pick.pick_result}</p>}
        </div>
      ))} */}
    </div>
  );
};

export default PicksPage;
