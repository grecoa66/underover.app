"use client";

import { useState } from "react";
import { slates } from "@prisma/client";
import { getCompletedSlates } from "../over-under/actions";
import { Button } from "@/app/components/Button";
import { PublicSlates } from "./Slates";

// TODO: add pagination
export const PastSlatesButton = () => {
  const [pastSlates, setPastSlates] = useState<slates[] | null>(null);

  const getPastSlatesHandler = async () => {
    const pastSlates = await getCompletedSlates();
    setPastSlates(pastSlates);
  };
  return (
    <div>
      {pastSlates === null ? (
        <Button text="Get Past Slates" onClick={() => getPastSlatesHandler()} />
      ) : (
        <PublicSlates slates={pastSlates} />
      )}
    </div>
  );
};
