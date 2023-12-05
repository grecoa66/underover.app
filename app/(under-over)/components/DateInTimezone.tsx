"use client";

import { DateTime } from "luxon";

export const DateInTimezone = ({
  date,
  className,
}: {
  date: Date;
  className?: string;
}) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <span className={className}>
      {DateTime.fromJSDate(date, { zone: tz })
        .toLocal()
        .toFormat("t, MM-dd-yyyy")}
    </span>
  );
};

export const DayAndMonthInTimezone = ({
  date,
  className,
}: {
  date: Date;
  className?: string;
}) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <span className={className}>
      {DateTime.fromJSDate(date, { zone: tz })
        .toLocal()
        .toFormat("cccc, LLL d @ t")}
    </span>
  );
};

export const SimpleDateDisplay = ({
  date,
  className,
}: {
  date: Date;
  className?: string;
}) => {
  return (
    <span className={className}>
      {DateTime.fromJSDate(date, { zone: "UTC" }).toLocaleString()}
    </span>
  );
};
