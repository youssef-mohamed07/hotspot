"use client";

import dynamic from "next/dynamic";
import { SceneLoader } from "./scene-loader";

export const CybertruckSceneDynamic = dynamic(
  () => import("@/components/cybertruck-scene").then((m) => m.CybertruckScene),
  { ssr: false, loading: () => <SceneLoader /> }
);
