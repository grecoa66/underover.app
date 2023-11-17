import { slates } from "@prisma/client";

const InactiveSlate = ({ slates }: { slates: slates[] }) => {
  return (
    <div className="flex w-36 flex-col border-2 border-mint">
      <p>Inactive Slates</p>
      {slates.map((slate) => (
        <div className="flex flex-row justify-center">
          <p>League {slate.league}</p>{" "}
          {slate.league === "nfl" && <p>{slate.nfl_week}</p>}
        </div>
      ))}
    </div>
  );
};

export { InactiveSlate };
