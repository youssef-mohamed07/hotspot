"use client";

import { IconArrowRight } from "@/components/icons";
import { useIsRtl } from "@/i18n/locale-provider";
import type { SVGProps } from "react";

export function DirectionalArrow({ className, ...props }: SVGProps<SVGSVGElement>) {
  const rtl = useIsRtl();
  return (
    <IconArrowRight
      className={[className, rtl ? "rtl-flip" : ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
