"use client";

import type { ComponentProps } from "react";
import { TransitionLink } from "glimm/next";

// Forward moves sweep left to right; going back sweeps the way you came
export function SweepLink({
  back = false,
  ...props
}: Omit<ComponentProps<typeof TransitionLink>, "sweep"> & { back?: boolean }) {
  return (
    <TransitionLink sweep={{ direction: back ? "rtl" : "ltr" }} {...props} />
  );
}
