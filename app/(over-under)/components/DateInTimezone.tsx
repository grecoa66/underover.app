"use client";

import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export const DateInTimezone = ({
  date,
  className,
}: {
  date: Date;
  className?: string;
}) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <span className={className}>
      {isClient
        ? DateTime.fromJSDate(date, { zone: tz })
            .toLocal()
            .toFormat("t, MM-dd-yyyy")
        : null}
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
