"use client";

import { DateTime } from "luxon";

export const DateInTimezone = ({ date }: { date: Date }) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log("TZ:", tz);

  return (
    <span>
      {DateTime.fromJSDate(date, { zone: tz })
        .toLocal()
        .toFormat("t, MM-dd-yyyy")}
    </span>
  );
};

export const SimpleDateDisplay = ({ date }: { date: Date }) => {
  return (
    <span>{DateTime.fromJSDate(date, { zone: "UTC" }).toLocaleString()}</span>
  );
};
