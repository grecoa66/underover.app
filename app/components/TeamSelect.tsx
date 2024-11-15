import { UseFormRegisterReturn } from "react-hook-form";
import { League } from "../types/slates";
import { mlb, nba, nfl, nhl } from "../data/team-names";

const TeamSelect = ({
  league,
  register,
}: {
  league: League;
  register: UseFormRegisterReturn;
}) => {
  switch (league) {
    case League.NHL: {
      return (
        <select {...register}>
          {Object.values(nhl).map((team) => (
            <option key={team.name_abbrev} value={team.team_name}>
              {team.team_name}
            </option>
          ))}
        </select>
      );
    }
    case League.MLB: {
      return (
        <select {...register}>
          {Object.values(mlb).map((team) => (
            <option key={team.name_abbrev} value={team.team_name}>
              {team.team_name}
            </option>
          ))}
        </select>
      );
    }
    case League.NBA: {
      return (
        <select {...register}>
          {Object.values(nba).map((team) => (
            <option key={team.name_abbrev} value={team.team_name}>
              {team.team_name}
            </option>
          ))}
        </select>
      );
    }
    case League.NFL: {
      return (
        <select {...register}>
          {Object.values(nfl).map((team) => (
            <option key={team.name_abbrev} value={team.team_name}>
              {team.team_name}
            </option>
          ))}
        </select>
      );
    }
    default: {
      const exhaustiveCheck: never = league;
      return exhaustiveCheck;
    }
  }
};

export default TeamSelect;
