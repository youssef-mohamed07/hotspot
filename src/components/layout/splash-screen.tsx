"use client";

import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { useDictionary, useLocale } from "@/i18n/locale-provider";

const SPLASH_HOLD_MS = 1400;
const SPLASH_EXIT_MS = 650;
const SPLASH_TOTAL_MS = SPLASH_HOLD_MS + SPLASH_EXIT_MS;

type Phase = "in" | "exit" | "done";

export function SplashScreen() {
  const dict = useDictionary();
  const locale = useLocale();
  const [phase, setPhase] = useState<Phase>("in");

  useLayoutEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      root.dataset.splash = "done";
      setPhase("done");
      return;
    }

    root.dataset.splash = "active";

    const exitTimer = window.setTimeout(() => {
      setPhase("exit");
    }, SPLASH_HOLD_MS);

    const doneTimer = window.setTimeout(() => {
      root.dataset.splash = "done";
      setPhase("done");
    }, SPLASH_TOTAL_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      root.dataset.splash = "done";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`splash-screen ${phase === "exit" ? "splash-screen--exit" : ""}`}
      role="presentation"
      aria-hidden
    >
      <div className="splash-screen__glow" aria-hidden />

      <div className="splash-screen__brand">
        <Image
          src="/logo.png"
          alt=""
          width={200}
          height={60}
          priority
          loading="eager"
          fetchPriority="high"
          sizes="200px"
          className="splash-screen__logo"
          style={{ width: "auto", height: "auto" }}
        />
        <p
          className="splash-screen__tagline"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          {dict.splash.tagline}
        </p>
      </div>
    </div>
  );
}
