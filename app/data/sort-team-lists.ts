#!/usr/bin/env ts-node

import { Team } from "../types/teams";
import { mlb, nba, nfl, nhl } from "./team-names";

const sortLeague = (league: Team) => {
  const sortedTeams = Object.entries(league).sort((a, b) => {
    return a[1].team_name < b[1].team_name ? -1 : 1;
  });
  // Turn the array back into an object
  return Object.fromEntries(sortedTeams.map((t) => [t[0], t[1]]));
};

console.log("sorted mlb: ", sortLeague(mlb));
console.log("sorted nfl: ", sortLeague(nfl));
console.log("sorted nhl: ", sortLeague(nhl));
console.log("sorted nba: ", sortLeague(nba));
