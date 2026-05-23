"use client";

import "@google/model-viewer";

import Image from "next/image";
import { createElement, useEffect, useRef, useState, type CSSProperties } from "react";
import { SceneLoader } from "@/components/scene/scene-loader";

interface CybertruckSceneProps {
  /** "hero" hides UI overlays and uses an autostart shot; "explore" enables full controls */
  initialView?: "hero" | "explore";
  className?: string;
  modelClassName?: string;
  showLogo?: boolean;
  tone?: "blue" | "gray" | "white";
}

const MODEL_SRC = "/Cybertruck%203D/Cybertruck%203D.glb";
const BRAND_BLUE = [0.16, 0.46, 0.65, 1] as const;
const HERO_GRAY = [0.42, 0.45, 0.48, 1] as const;
const SECTION_WHITE = [0.94, 0.93, 0.9, 1] as const;

type ModelViewerElement = HTMLElement & {
  model?: {
    materials?: Array<{
      pbrMetallicRoughness?: {
        setBaseColorFactor?: (color: readonly [number, number, number, number]) => void;
        setMetallicFactor?: (value: number) => void;
        setRoughnessFactor?: (value: number) => void;
      };
    }>;
  };
};

const modelViewerStyle = {
  width: "100%",
  height: "100%",
  background: "transparent",
  "--poster-color": "transparent",
} as CSSProperties;

export function CybertruckScene({
  initialView = "explore",
  className = "",
  modelClassName = "",
  showLogo = true,
  tone = "blue",
}: CybertruckSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const modelRef = useRef<ModelViewerElement | null>(null);
  const isHero = initialView === "hero";

  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    const applyBrandMaterial = () => {
      const baseColor =
        tone === "white" ? SECTION_WHITE : tone === "gray" ? HERO_GRAY : BRAND_BLUE;

      model.model?.materials?.forEach((material) => {
        material.pbrMetallicRoughness?.setBaseColorFactor?.(baseColor);
        material.pbrMetallicRoughness?.setMetallicFactor?.(
          tone === "white" ? 0.45 : tone === "gray" ? 0.65 : 0.85,
        );
        material.pbrMetallicRoughness?.setRoughnessFactor?.(
          tone === "white" ? 0.42 : tone === "gray" ? 0.36 : 0.28,
        );
      });
    };

    const handleLoad = () => {
      applyBrandMaterial();
      setLoaded(true);
    };

    const handleError = () => setLoaded(true);

    model.addEventListener("load", handleLoad);
    model.addEventListener("error", handleError);

    return () => {
      model.removeEventListener("load", handleLoad);
      model.removeEventListener("error", handleError);
    };
  }, [tone]);

  const viewerProps: Record<string, unknown> = {
    ref: modelRef,
    src: MODEL_SRC,
    alt: "3D Cybertruck activation model",
    "auto-rotate": true,
    "camera-orbit": isHero ? "35deg 72deg 96%" : "35deg 68deg 78%",
    "disable-pan": false,
    "disable-tap": false,
    "environment-image": "neutral",
    exposure: tone === "white" ? "1.15" : tone === "gray" ? "0.9" : "1.05",
    "field-of-view": "24deg",
    "interaction-prompt": isHero ? "none" : "auto",
    "interaction-prompt-style": "wiggle",
    "max-camera-orbit": "auto auto 130%",
    "min-camera-orbit": "auto auto 35%",
    "rotation-per-second": isHero ? "12deg" : "18deg",
    "shadow-intensity": "0.9",
    "touch-action": isHero ? "none" : "pan-y",
    className: `h-full w-full ${modelClassName}`,
    style: modelViewerStyle,
  };

  if (!isHero) {
    viewerProps["camera-controls"] = true;
  }

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-[36px] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[#05060a]/30">
          <SceneLoader />
        </div>
      )}

      {createElement("model-viewer", viewerProps)}

      {showLogo && (
        <div className="pointer-events-none absolute left-1/2 top-[57%] z-20 w-[18%] min-w-20 max-w-40 -translate-x-1/2 -translate-y-1/2 -rotate-6 opacity-90 mix-blend-screen drop-shadow-[0_0_18px_rgba(255,255,255,0.55)]">
          <Image
            src="/logo.png"
            alt=""
            width={220}
            height={64}
            className="h-auto w-full"
            aria-hidden
          />
        </div>
      )}
    </div>
  );
}
