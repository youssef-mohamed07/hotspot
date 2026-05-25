"use client";

import "@google/model-viewer";

import Image from "next/image";
import {
  createElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { SceneLoader } from "@/components/scene/scene-loader";

interface CybertruckSceneProps {
  /** "hero" hides UI overlays and uses an autostart shot; "explore" enables full controls */
  initialView?: "hero" | "explore";
  src?: string;
  alt?: string;
  className?: string;
  modelClassName?: string;
  showLogo?: boolean;
  showControls?: boolean;
  controlsLabels?: Partial<CybertruckControlsLabels>;
  tone?: "blue" | "gray" | "white" | "original";
}

const MODEL_SRC = "/Cybertruck%203D/Cybertruck%203D.glb";
const DEFAULT_FIELD_OF_VIEW = "24deg";
const BRAND_BLUE = [0.16, 0.46, 0.65, 1] as const;
const HERO_GRAY = [0.42, 0.45, 0.48, 1] as const;
const SECTION_WHITE = [0.94, 0.93, 0.9, 1] as const;

type CybertruckControlsLabels = {
  instruction: string;
  autoRotateOn: string;
  autoRotateOff: string;
  front: string;
  side: string;
  rear: string;
  top: string;
  zoomIn: string;
  zoomOut: string;
  reset: string;
};

const defaultControlsLabels: CybertruckControlsLabels = {
  instruction: "Drag, zoom, pan, or use the controls",
  autoRotateOn: "Pause spin",
  autoRotateOff: "Auto spin",
  front: "Front",
  side: "Side",
  rear: "Rear",
  top: "Top",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  reset: "Reset",
};

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
  src = MODEL_SRC,
  alt = "3D Cybertruck activation model",
  className = "",
  modelClassName = "",
  showLogo = true,
  showControls = false,
  controlsLabels,
  tone = "blue",
}: CybertruckSceneProps) {
  const isHero = initialView === "hero";
  const [loaded, setLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [cameraOrbit, setCameraOrbit] = useState(
    isHero ? "35deg 70deg 74%" : "35deg 68deg 78%",
  );
  const [fieldOfView, setFieldOfView] = useState(DEFAULT_FIELD_OF_VIEW);
  const modelRef = useRef<ModelViewerElement | null>(null);
  const labels = { ...defaultControlsLabels, ...controlsLabels };

  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    const applyBrandMaterial = () => {
      if (tone === "original") return;

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
      requestAnimationFrame(() => setLoaded(true));
    };

    const handleError = () => setLoaded(true);

    model.addEventListener("load", handleLoad);
    model.addEventListener("error", handleError);

    return () => {
      model.removeEventListener("load", handleLoad);
      model.removeEventListener("error", handleError);
    };
  }, [tone]);

  useLayoutEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    model.setAttribute("camera-orbit", cameraOrbit);
    model.setAttribute("field-of-view", fieldOfView);

    if (autoRotate) {
      model.setAttribute("auto-rotate", "");
    } else {
      model.removeAttribute("auto-rotate");
    }
  }, [cameraOrbit, fieldOfView, autoRotate]);

  const viewerProps = useMemo(
    () => ({
      ref: modelRef,
      src,
      alt,
      "disable-pan": false,
      "disable-tap": false,
      "environment-image": "neutral",
      exposure: tone === "white" ? "1.15" : tone === "gray" ? "0.9" : "1.05",
      "interaction-prompt": isHero ? "none" : "auto",
      "interaction-prompt-style": "wiggle",
      "max-camera-orbit": "auto auto 130%",
      "min-camera-orbit": "auto auto 35%",
      "rotation-per-second": isHero ? "12deg" : "18deg",
      "shadow-intensity": "0.9",
      "touch-action": isHero ? "none" : "pan-y",
      className: `h-full w-full ${modelClassName}`,
      style: modelViewerStyle,
      ...(!isHero ? { "camera-controls": true } : {}),
    }),
    [src, alt, isHero, tone, modelClassName],
  );

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-[36px] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[#05060a]/30">
          <SceneLoader />
        </div>
      )}

      {createElement("model-viewer", viewerProps)}

      {showControls && (
        <div className="absolute inset-x-4 bottom-4 z-30 rounded-2xl border border-white/70 bg-white/85 p-3 text-zinc-900 shadow-2xl shadow-black/10 backdrop-blur-md sm:inset-x-6 sm:bottom-6">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
            {labels.instruction}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setAutoRotate((value) => !value)}
              className="rounded-full bg-zinc-950 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-accent"
            >
              {autoRotate ? labels.autoRotateOn : labels.autoRotateOff}
            </button>
            {[
              [labels.front, "0deg 68deg 78%"],
              [labels.side, "90deg 68deg 82%"],
              [labels.rear, "180deg 68deg 82%"],
              [labels.top, "35deg 28deg 86%"],
            ].map(([label, orbit]) => (
              <button
                key={label}
                type="button"
                onClick={() => setCameraOrbit(orbit)}
                className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-zinc-700 transition hover:border-accent hover:text-accent"
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFieldOfView("18deg")}
              className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-zinc-700 transition hover:border-accent hover:text-accent"
            >
              {labels.zoomIn}
            </button>
            <button
              type="button"
              onClick={() => setFieldOfView("32deg")}
              className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-zinc-700 transition hover:border-accent hover:text-accent"
            >
              {labels.zoomOut}
            </button>
            <button
              type="button"
              onClick={() => {
                setCameraOrbit(isHero ? "35deg 70deg 74%" : "35deg 68deg 78%");
                setFieldOfView(DEFAULT_FIELD_OF_VIEW);
                setAutoRotate(true);
              }}
              className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-zinc-700 transition hover:border-accent hover:text-accent"
            >
              {labels.reset}
            </button>
          </div>
        </div>
      )}

      {showLogo && (
        <div className="pointer-events-none absolute left-1/2 top-[57%] z-20 w-[18%] min-w-20 max-w-40 -translate-x-1/2 -translate-y-1/2 -rotate-6 opacity-90 mix-blend-screen drop-shadow-[0_0_18px_rgba(255,255,255,0.55)]">
          <Image
            src="/logo.png"
            alt=""
            width={220}
            height={64}
            className="h-auto w-full max-w-full"
            style={{ width: "auto", height: "auto" }}
            aria-hidden
          />
        </div>
      )}
    </div>
  );
}
