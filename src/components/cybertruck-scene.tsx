"use client";

import Image from "next/image";
import {
  createElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { SceneLoader } from "@/components/scene/scene-loader";
import {
  classifyMaterial,
  type SceneFinish,
  type SceneMaterial,
} from "@/components/scene/material-utils";

export { classifyMaterial, type SceneFinish, type SceneMaterial };

interface CybertruckSceneProps {
  initialView?: "hero" | "explore" | "showroom";
  src?: string;
  alt?: string;
  className?: string;
  modelClassName?: string;
  showLogo?: boolean;
  showControls?: boolean;
  controlsPlacement?: "bottom" | "side";
  controlsLabels?: Partial<CybertruckControlsLabels>;
  tone?: "blue" | "gray" | "white" | "original";
  /** Map of material index -> hex color. */
  materialColors?: Record<number, string>;
  finish?: SceneFinish;
  logoSrc?: string | null;
  autoRotate?: boolean;
  cameraOrbit?: string;
  rotationPerSecond?: string;
  disableZoom?: boolean;
  onMaterialsReady?: (materials: SceneMaterial[]) => void;
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

type ModelMaterial = {
  name?: string;
  pbrMetallicRoughness?: {
    setBaseColorFactor?: (color: readonly [number, number, number, number]) => void;
    setMetallicFactor?: (value: number) => void;
    setRoughnessFactor?: (value: number) => void;
  };
};

type ModelViewerElement = HTMLElement & {
  model?: {
    materials?: ModelMaterial[];
  };
};

const modelViewerStyle = {
  width: "100%",
  height: "100%",
  background: "transparent",
  "--poster-color": "transparent",
} as CSSProperties;

const FINISH_PARAMS: Record<SceneFinish, { metallic: number; roughness: number }> = {
  matte: { metallic: 0.25, roughness: 0.7 },
  satin: { metallic: 0.5, roughness: 0.45 },
  gloss: { metallic: 0.75, roughness: 0.25 },
  chrome: { metallic: 1, roughness: 0.08 },
};

function hexToColorFactor(
  hex: string,
): readonly [number, number, number, number] | null {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const value = match[1];
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  return [r, g, b, 1];
}

export function CybertruckScene({
  initialView = "explore",
  src = MODEL_SRC,
  alt = "3D Cybertruck activation model",
  className = "",
  modelClassName = "",
  showLogo = true,
  showControls = false,
  controlsPlacement = "bottom",
  controlsLabels,
  tone = "blue",
  materialColors,
  finish,
  logoSrc,
  autoRotate: autoRotateProp,
  cameraOrbit: cameraOrbitProp,
  rotationPerSecond,
  disableZoom = false,
  onMaterialsReady,
}: CybertruckSceneProps) {
  const isHero = initialView === "hero";
  const isShowroom = initialView === "showroom";
  const [loaded, setLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(autoRotateProp ?? true);
  const defaultOrbit = isShowroom
    ? "30deg 75deg 78%"
    : isHero
      ? "35deg 70deg 74%"
      : "35deg 68deg 78%";
  const [cameraOrbit, setCameraOrbit] = useState(cameraOrbitProp ?? defaultOrbit);
  const [fieldOfView, setFieldOfView] = useState(DEFAULT_FIELD_OF_VIEW);
  const modelRef = useRef<ModelViewerElement | null>(null);
  const materialsRef = useRef<ModelMaterial[]>([]);
  const labels = { ...defaultControlsLabels, ...controlsLabels };
  const controlsClassName =
    controlsPlacement === "side"
      ? "absolute right-0 inset-y-0 z-30 flex w-32 flex-col gap-2 overflow-y-auto rounded-l-2xl rounded-r-none border-s border-white/70 bg-white/90 p-3 text-zinc-900 shadow-2xl shadow-black/10 backdrop-blur-md sm:w-36"
      : "absolute inset-x-4 bottom-4 z-30 rounded-2xl border border-white/70 bg-white/85 p-3 text-zinc-900 shadow-2xl shadow-black/10 backdrop-blur-md sm:inset-x-6 sm:bottom-6";

  // Load model-viewer only in the browser runtime.
  useEffect(() => {
    void import("@google/model-viewer");
  }, []);

  // Sync external controlled props.
  useEffect(() => {
    if (autoRotateProp !== undefined) setAutoRotate(autoRotateProp);
  }, [autoRotateProp]);

  useEffect(() => {
    if (cameraOrbitProp !== undefined) setCameraOrbit(cameraOrbitProp);
  }, [cameraOrbitProp]);

  const applyMaterials = useCallback(() => {
    const materials = materialsRef.current;
    if (!materials.length) return;

    const finishParams = finish ? FINISH_PARAMS[finish] : null;

    const fallback =
      tone === "original"
        ? null
        : tone === "white"
          ? SECTION_WHITE
          : tone === "gray"
            ? HERO_GRAY
            : BRAND_BLUE;

    materials.forEach((material, index) => {
      const override = materialColors?.[index];
      const factor = override ? hexToColorFactor(override) : fallback;

      if (factor) {
        material.pbrMetallicRoughness?.setBaseColorFactor?.(factor);
      }

      if (finishParams) {
        material.pbrMetallicRoughness?.setMetallicFactor?.(finishParams.metallic);
        material.pbrMetallicRoughness?.setRoughnessFactor?.(finishParams.roughness);
      }
    });
  }, [materialColors, finish, tone]);

  // Initial load: introspect materials once.
  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    const handleLoad = () => {
      const materials = model.model?.materials ?? [];
      materialsRef.current = materials;

      onMaterialsReady?.(
        materials.map((material, index) => ({
          index,
          name: material.name && material.name.trim()
            ? material.name
            : `Material ${index + 1}`,
        })),
      );

      applyMaterials();
      requestAnimationFrame(() => setLoaded(true));
    };

    const handleError = () => setLoaded(true);

    model.addEventListener("load", handleLoad);
    model.addEventListener("error", handleError);

    return () => {
      model.removeEventListener("load", handleLoad);
      model.removeEventListener("error", handleError);
    };
  }, [src, applyMaterials, onMaterialsReady]);

  // Re-apply whenever colors / finish change.
  useEffect(() => {
    applyMaterials();
  }, [applyMaterials]);

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
      "disable-pan": isShowroom ? true : false,
      "disable-tap": isShowroom ? true : false,
      "environment-image": "neutral",
      exposure:
        tone === "white" ? "1.15" : tone === "gray" ? "0.9" : isShowroom ? "1.1" : "1.05",
      "interaction-prompt": isShowroom || isHero ? "none" : "auto",
      "interaction-prompt-style": "wiggle",
      "max-camera-orbit": "auto auto 130%",
      "min-camera-orbit": "auto auto 35%",
      "rotation-per-second":
        rotationPerSecond ?? (isShowroom ? "10deg" : isHero ? "12deg" : "18deg"),
      "shadow-intensity": isShowroom ? "1.1" : "0.9",
      "touch-action": isShowroom || isHero ? "none" : "pan-y",
      className: `h-full w-full ${modelClassName}`,
      style: modelViewerStyle,
      "disable-zoom": disableZoom ? true : false,
      ...(!isHero && !isShowroom ? { "camera-controls": true } : {}),
    }),
    [
      src,
      alt,
      isHero,
      isShowroom,
      tone,
      modelClassName,
      disableZoom,
      rotationPerSecond,
    ],
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
        <div className={controlsClassName}>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
            {labels.instruction}
          </p>
          <div className={controlsPlacement === "side" ? "flex flex-col gap-1.5" : "flex flex-wrap gap-2"}>
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
                setCameraOrbit(defaultOrbit);
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

      {showLogo && !logoSrc && (
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
