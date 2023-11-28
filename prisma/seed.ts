import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function seedSlates() {
  const slates = await prisma.slates.createMany({
    data: [
      {
        league: "nfl",
        nfl_week: 9,
        start_date: "2023-11-05T11:00:00.000Z",
        end_date: "2023-11-05T23:00:00.000Z",
        is_active: false,
        is_locked: true,
        is_complete: true,
        created_by: 1,
      },
      {
        league: "nfl",
        nfl_week: 10,
        start_date: "2023-11-12T11:00:00.000Z",
        end_date: "2023-11-12T23:00:00.000Z",
        is_active: false,
        is_locked: true,
        is_complete: true,
        created_by: 1,
      },
      {
        league: "nfl",
        nfl_week: 11,
        start_date: "2023-11-19T11:00:00.000Z",
        end_date: "2023-11-19T23:00:00.000Z",
        is_active: true,
        is_locked: false,
        is_complete: false,
        created_by: 1,
      },
    ],
  });

  const props = await prisma.props.createMany({
    data: [
      {
        league: "nfl",
        player_name: "Josh Allen",
        team_name: "Buffalo Bills",
        team_matchup: "New York Jets @ Buffalo Bills",
        game_start_time: "2023-11-05T11:00:00.000Z",
        start_date: "2023-11-05T00:00:00.000Z",
        end_date: "2023-11-05T23:00:00.000Z",
        prop_type: "Passing Yards",
        under_value: 237.5,
        under_price: -114,
        over_value: 237.5,
        over_price: -114,
        prop_result: "over",
        created_by: 1,
        created_at: "2023-11-04T11:00:00.000Z",
        modified_at: "2023-11-04T11:00:00.000Z",
        slate_id: 1,
        is_active: false,
      },
      {
        league: "nfl",
        player_name: "Zach Wilson",
        team_name: "New York Jets",
        team_matchup: "New York Jets @ Buffalo Bills",
        game_start_time: "2023-11-05T11:00:00.000Z",
        start_date: "2023-11-05T11:00:00.000Z",
        end_date: "2023-11-05T14:00:00.000Z",
        prop_type: "Passing Yards",
        under_value: 206.5,
        under_price: -114,
        over_value: 206.5,
        over_price: -114,
        prop_result: "under",
        created_by: 1,
        created_at: "2023-11-04T11:00:00.000Z",
        modified_at: "2023-11-04T11:00:00.000Z",
        slate_id: 1,
        is_active: false,
      },
      {
        league: "nfl",
        team_matchup: "New York Jets @ Buffalo Bills",
        game_start_time: "2023-11-12T14:00:00.000Z",
        start_date: "2023-11-12T00:00:00.000Z",
        end_date: "2023-11-12T23:00:00.000Z",
        prop_type: "Total Points",
        under_value: 37.5,
        under_price: 104,
        over_value: 37.5,
        over_price: -114,
        prop_result: "over",
        created_by: 1,
        created_at: "2023-11-11T00:00:00.000Z",
        modified_at: "2023-11-11T00:00:00.000Z",
        slate_id: 2,
        is_active: false,
      },
      {
        league: "nfl",
        player_name: "Justin Hurbert",
        team_name: "Los Angeles Chargers",
        team_matchup: "Los Angeles Chargers @ Green Bay Packers",
        game_start_time: "2023-11-19T11:00:00.000Z",
        start_date: "2023-11-19T00:00:00.000Z",
        end_date: "2023-11-19T23:00:00.000Z",
        prop_type: "Passing TDs",
        prop_result: "active",
        under_value: 1.5,
        under_price: -102,
        over_value: 1.5,
        over_price: -130,
        created_by: 1,
        created_at: "2023-11-18T11:00:00.000Z",
        modified_at: "2023-11-18T11:00:00.000Z",
        slate_id: 3,
        is_active: true,
      },
      {
        league: "nfl",
        player_name: "Tommy Devito",
        team_name: "New York Giants",
        team_matchup: "New York Giants @ Washington Commanders",
        game_start_time: "2023-11-19T11:00:00.000Z",
        start_date: "2023-11-19T00:00:00.000Z",
        end_date: "2023-11-19T23:00:00.000Z",
        prop_type: "Passing TDs",
        prop_result: "active",
        under_value: 17.5,
        under_price: -102,
        over_value: 17.5,
        over_price: -130,
        created_by: 1,
        created_at: "2023-11-18T11:00:00.000Z",
        modified_at: "2023-11-18T11:00:00.000Z",
        slate_id: 3,
        is_active: true,
      },
    ],
  });

  console.log("Data: ", { slates, props });
  // console.log("Data: ", { slates });
  // console.log("Data: ", { props });
}
seedSlates()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
