"use client";

import { slates } from "@prisma/client";
import { useState } from "react";

import { Button } from "@/app/components/Button";

import { getCompletedSlates } from "../over-under/actions";
import { PublicSlates } from "./Slates";

// TODO: add pagination
export const PastSlatesButton = () => {
  const [pastSlates, setPastSlates] = useState<slates[] | null>(null);
  const [loading, setLoading] = useState(false);

  const getPastSlatesHandler = async () => {
    setLoading(true);
    const pastSlates = await getCompletedSlates();
    setPastSlates(pastSlates);
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <div className="mt-6">Loading...</div>
      ) : (
        <>
          {pastSlates === null ? (
            <Button
              text="Get Past Slates"
              onClick={() => getPastSlatesHandler()}
              className="mt-6"
            />
          ) : (
            <>
              <h3 className="mb-2 text-xl">Past Slates</h3>
              <PublicSlates slates={pastSlates} />
            </>
          )}
        </>
      )}
    </div>
  );
};
