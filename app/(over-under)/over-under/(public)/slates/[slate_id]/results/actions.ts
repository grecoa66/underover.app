import { props, slates } from "@prisma/client";
import { Dictionary, groupBy, orderBy } from "lodash";

import { prisma } from "@/app/api/__prismaClient";
import {
  LeaderboardResult,
  PickResult,
  PicksWithUserAndProp,
} from "@/app/types/picks";

export const getResultsForSlate = async ({
  slate_id,
}: {
  slate_id: slates["id"];
}): Promise<Dictionary<PicksWithUserAndProp>> => {
  const slate = await prisma.slates.findUnique({
    where: {
      id: slate_id,
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }
  const picks = await prisma.picks.findMany({
    where: {
      slate_id: slate.id,
      deleted_at: null,
    },
    include: {
      users: true,
      props: true,
    },
  });

  const picksGroupByUser = groupBy(picks, (pick) => {
    return pick.created_by;
  });

  return picksGroupByUser;
};

export const getResultsForProp = async ({
  prop_id,
}: {
  prop_id: props["id"];
}): Promise<Dictionary<PicksWithUserAndProp>> => {
  const prop = await prisma.props.findUnique({
    where: {
      id: prop_id,
    },
  });

  if (!prop) {
    throw Error("Prop not found");
  }

  const picks = await prisma.picks.findMany({
    where: {
      prop_id: prop.id,
      deleted_at: null,
    },
    include: {
      users: true,
      props: true,
    },
  });

  const picksGroupByUser = groupBy(picks, (pick) => {
    return pick.created_by;
  });

  return picksGroupByUser;
};

export const getResultForLeaderboard = async ({
  slate_id,
}: {
  slate_id: slates["id"];
}): Promise<LeaderboardResult[]> => {
  const resultOfPicks = await getResultsForSlate({ slate_id });

  const leaderboardResults = Object.entries(resultOfPicks).map((entry) => {
    const picksRecord = entry[1].reduce(
      (acc, curr) => {
        if (curr.pick_result === PickResult.Win) {
          acc.wins++;
          return acc;
        } else if (
          curr.pick_result === PickResult.Lose ||
          curr.pick_result === PickResult.Push
        ) {
          acc.losses++;
          return acc;
        }
        acc.active++;
        return acc;
      },
      { wins: 0, losses: 0, active: 0 },
    );

    return {
      user_id: Number(entry[0]),
      picks: entry[1],
      record: picksRecord,
      position: 0,
    };
  });

  const ranked = sortAndRankPicks(leaderboardResults);

  return ranked;
};

const sortAndRankPicks = (
  leaderboardResults: LeaderboardResult[],
): LeaderboardResult[] => {
  const usersSortedByWins = orderBy(
    leaderboardResults,
    (r) => r.record.wins,
    "desc",
  );

  let position = 1;

  return usersSortedByWins.map((result, index) => {
    if (result.record.wins === 0 && result.record.losses === 0) {
      return { ...result, position: 0 };
    }
    if (index === 0) {
      return { ...result, position: 1 };
    }
    if (result.record.wins < usersSortedByWins[index - 1].record.wins) {
      position++;
    }
    return { ...result, position: position };
  });
};

const testData = [
  {
    user_id: "1",
    picks: [
      {
        id: 46,
        selection: "under",
        pick_result: null,
        is_locked: true,
        created_by: 1,
        prop_id: 10,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 47,
        selection: "over",
        pick_result: null,
        is_locked: true,
        created_by: 1,
        prop_id: 11,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 44,
        selection: "over",
        pick_result: "win",
        is_locked: true,
        created_by: 1,
        prop_id: 8,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 43,
        selection: "over",
        pick_result: "lose",
        is_locked: true,
        created_by: 1,
        prop_id: 7,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 45,
        selection: "over",
        pick_result: "win",
        is_locked: true,
        created_by: 1,
        prop_id: 9,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
    ],
    record: { wins: 2, losses: 1, active: 2 },
  },
  {
    user_id: "2",
    picks: [
      {
        id: 46,
        selection: "under",
        pick_result: null,
        is_locked: true,
        created_by: 1,
        prop_id: 10,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 47,
        selection: "over",
        pick_result: null,
        is_locked: true,
        created_by: 1,
        prop_id: 11,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 44,
        selection: "over",
        pick_result: "win",
        is_locked: true,
        created_by: 1,
        prop_id: 8,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 43,
        selection: "over",
        pick_result: "lose",
        is_locked: true,
        created_by: 1,
        prop_id: 7,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 45,
        selection: "over",
        pick_result: "win",
        is_locked: true,
        created_by: 1,
        prop_id: 9,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
    ],
    record: { wins: 2, losses: 1, active: 2 },
  },
  {
    user_id: "3",
    picks: [
      {
        id: 46,
        selection: "under",
        pick_result: null,
        is_locked: true,
        created_by: 1,
        prop_id: 10,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 47,
        selection: "over",
        pick_result: null,
        is_locked: true,
        created_by: 1,
        prop_id: 11,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 44,
        selection: "over",
        pick_result: "win",
        is_locked: true,
        created_by: 1,
        prop_id: 8,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 43,
        selection: "over",
        pick_result: "lose",
        is_locked: true,
        created_by: 1,
        prop_id: 7,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 45,
        selection: "over",
        pick_result: "win",
        is_locked: true,
        created_by: 1,
        prop_id: 9,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
    ],
    record: { wins: 1, losses: 2, active: 2 },
  },
  {
    user_id: "4",
    picks: [
      {
        id: 46,
        selection: "under",
        pick_result: null,
        is_locked: true,
        created_by: 1,
        prop_id: 10,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 47,
        selection: "over",
        pick_result: null,
        is_locked: true,
        created_by: 1,
        prop_id: 11,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 44,
        selection: "over",
        pick_result: "win",
        is_locked: true,
        created_by: 1,
        prop_id: 8,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 43,
        selection: "over",
        pick_result: "lose",
        is_locked: true,
        created_by: 1,
        prop_id: 7,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 45,
        selection: "over",
        pick_result: "win",
        is_locked: true,
        created_by: 1,
        prop_id: 9,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
    ],
    record: { wins: 5, losses: 3, active: 2 },
  },
  {
    user_id: "5",
    picks: [
      {
        id: 46,
        selection: "under",
        pick_result: null,
        is_locked: true,
        created_by: 1,
        prop_id: 10,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 47,
        selection: "over",
        pick_result: null,
        is_locked: true,
        created_by: 1,
        prop_id: 11,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 44,
        selection: "over",
        pick_result: "win",
        is_locked: true,
        created_by: 1,
        prop_id: 8,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 43,
        selection: "over",
        pick_result: "lose",
        is_locked: true,
        created_by: 1,
        prop_id: 7,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
      {
        id: 45,
        selection: "over",
        pick_result: "win",
        is_locked: true,
        created_by: 1,
        prop_id: 9,
        slate_id: 4,
        created_at: new Date(),
        modified_at: new Date(),
        deleted_at: null,
        users: [
          {
            id: 1,
            name: "A K Greco",
            email: "alex.k.greco.4@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocKy7eeKZHHuAKjq7dkldjuNZoIwWQrXbuPX5DxRzZi25Cc=s96-c",
            role: "admin",
          },
        ],
        props: [
          {
            id: 10,
            league: "nhl",
            player_name: "Connor Bedard",
            players_team: "Chicago Blackhawks",
            home_team: "Chicago Blackhawks",
            away_team: "Anaheim Ducks",
            game_start_time: new Date(),
            start_date: new Date(),
            end_date: new Date(),
            prop_type: "Points",
            under_price: 140,
            prop_value: 0.5,
            over_price: -180,
            prop_result: "active",
            created_by: 1,
            created_at: new Date(),
            modified_at: new Date(),
            deleted_at: null,
            slate_id: 4,
            is_active: false,
          },
        ],
      },
    ],
    record: { wins: 0, losses: 3, active: 2 },
  },
];
