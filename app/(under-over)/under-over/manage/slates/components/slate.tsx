import { slates } from "@prisma/client";
import { FaPen } from "react-icons/fa";

const Slate = ({ slate }: { slate: slates }) => {
  return (
    <div className="flex flex-col justify-center p-2">
      <p>League {slate.league}</p>{" "}
      {slate.league === "nfl" && <p>Week {slate.nfl_week}</p>}
    </div>
  );
};

const InactiveSlates = ({ slates }: { slates: slates[] }) => {
  return (
    <div className="flex w-1/6 flex-col border-2 border-mint p-4">
      <p className="border-b-2 border-mint pb-2">Inactive Slates</p>
      {slates.map((slate) => (
        <Slate key={slate.id} slate={slate} />
      ))}
    </div>
  );
};

const ActiveSlates = ({ slates }: { slates: slates[] }) => {
  return (
    <div className="flex w-1/6 flex-col border-2 border-mint p-4">
      <p className="border-b-2 border-mint pb-2">Active Slates</p>
      {slates.map((slate) => (
        <Slate key={slate.id} slate={slate} />
      ))}
      {/* TODO: Abstract Button */}
      <div
        className={
          "flex flex-row items-center justify-center space-x-2 rounded-lg border-2 border-mint p-2 hover:bg-mint hover:text-black"
        }
      >
        <FaPen />
        <button type="button">Edit</button>
      </div>
    </div>
  );
};

export { InactiveSlates, ActiveSlates };
