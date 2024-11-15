import { DateTime } from "luxon";

export const TimeUntilStart = ({ date }: { date: Date }) => {
  const daysFromNow = DateTime.fromJSDate(date).diffNow().as("days");
  let days: number;

  if (daysFromNow > 0) {
    days = Math.floor(daysFromNow);
  } else {
    days = Math.ceil(daysFromNow);
  }

  if (days === 0) {
    return <p>Starts today!</p>;
  }
  if (days >= 1) {
    return <p>{`Starts in ${days} day${days > 1 ? "s" : ""}`}</p>;
  }
  if (days <= -1) {
    return <p>{`Started ${Math.abs(days)} day${days < -1 ? "s" : ""} ago`}</p>;
  }
  return <></>;
};
