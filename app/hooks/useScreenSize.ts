"use client";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";
import { useMediaQuery } from "@uidotdev/usehooks";

const twConfig = resolveConfig(tailwindConfig);

export default function useScreenSize() {
  const isSmallDevice = useMediaQuery(
    `only screen and (max-width: ${twConfig.theme.screens.md})`,
  );
  const isMediumDevice = useMediaQuery(
    `only screen and (min-width: ${twConfig.theme.screens.md})`,
  );
  const isLargeDevice = useMediaQuery(
    `only screen and (min-width: ${twConfig.theme.screens.lg})`,
  );
  const isExtraLargeDevice = useMediaQuery(
    `only screen and (min-width: ${twConfig.theme.screens.xl})`,
  );
  return { isSmallDevice, isMediumDevice, isLargeDevice, isExtraLargeDevice };
}
