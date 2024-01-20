"use client";
import { Button } from "@/app/components/Button";
import { PropResult } from "@/app/types/props";
import { props } from "@prisma/client";
import {
  FaArrowCircleDown,
  FaArrowCircleRight,
  FaArrowCircleUp,
  FaRecycle,
} from "react-icons/fa";
import { settleProp } from "../over-under/manage/slates/[slate_id]/props/actions";

export const SettlePropButtons = ({
  prop,
}: {
  prop: Pick<props, "id" | "prop_result">;
}) => {
  return (
    <>
      <Button
        text={PropResult.Over}
        disabled={prop.prop_result === PropResult.Over}
        StartIcon={FaArrowCircleUp}
        onClick={async () => await settleProp(prop.id, PropResult.Over)}
      />
      <Button
        text={PropResult.Under}
        disabled={prop.prop_result === PropResult.Under}
        StartIcon={FaArrowCircleDown}
        onClick={async () => await settleProp(prop.id, PropResult.Under)}
      />
      <Button
        text={PropResult.Push}
        disabled={prop.prop_result === PropResult.Push}
        StartIcon={FaArrowCircleRight}
        onClick={async () => await settleProp(prop.id, PropResult.Push)}
      />
      <Button
        text={PropResult.Active}
        disabled={prop.prop_result === PropResult.Active}
        StartIcon={FaRecycle}
        onClick={async () => await settleProp(prop.id, PropResult.Active)}
      />
    </>
  );
};
