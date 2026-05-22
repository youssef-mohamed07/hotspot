"use client";

import { useState } from "react";
import { SceneLoader } from "@/components/scene/scene-loader";

interface CybertruckSceneProps {
  /** "hero" hides UI overlays and uses an autostart shot; "explore" enables full controls */
  initialView?: "hero" | "explore";
}

/**
 * Sketchfab embed for the "Cyberpunk car" by 4d_Bob.
 * https://sketchfab.com/3d-models/cyberpunk-car-b4301ff99d214d16a7a43708a5866bf0
 *
 * Embed parameters reference: https://sketchfab.com/developers/viewer/initialization
 */
const MODEL_ID = "b4301ff99d214d16a7a43708a5866bf0";

const heroParams = new URLSearchParams({
  autostart: "1",
  ui_infos: "0",
  ui_controls: "0",
  ui_stop: "0",
  ui_watermark: "0",
  ui_watermark_link: "0",
  ui_help: "0",
  ui_settings: "0",
  ui_inspector: "0",
  ui_annotations: "0",
  ui_fullscreen: "0",
  ui_vr: "0",
  ui_ar: "0",
  ui_ar_qrcode: "0",
  ui_animations: "0",
  ui_loading: "0",
  ui_color: "2a76a6",
  transparent: "1",
  preload: "1",
  dnt: "1",
}).toString();

const exploreParams = new URLSearchParams({
  autostart: "1",
  ui_infos: "0",
  ui_watermark_link: "0",
  ui_watermark: "0",
  ui_color: "2a76a6",
  transparent: "1",
  preload: "1",
  dnt: "1",
}).toString();

export function CybertruckScene({ initialView = "explore" }: CybertruckSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const params = initialView === "hero" ? heroParams : exploreParams;
  const src = `https://sketchfab.com/models/${MODEL_ID}/embed?${params}`;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[36px]">
      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[#05060a]/30">
          <SceneLoader />
        </div>
      )}

      <iframe
        title="Cyberpunk Cybertruck"
        src={src}
        onLoad={() => setLoaded(true)}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        {...({
          "execution-while-out-of-viewport": "true",
          "execution-while-not-rendered": "true",
          "web-share": "true",
        } as Record<string, string>)}
        className="h-full w-full border-0"
        style={{ background: "transparent" }}
      />

      {/* Attribution (required by Sketchfab CC license) */}
      <div className="pointer-events-none absolute bottom-3 right-3 text-[9px] text-zinc-600">
        <a
          href={`https://sketchfab.com/3d-models/cyberpunk-car-${MODEL_ID}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="pointer-events-auto rounded-full bg-black/40 px-2 py-1 text-zinc-500 backdrop-blur transition hover:text-zinc-300"
        >
          Model by 4d_Bob · Sketchfab
        </a>
      </div>
    </div>
  );
}
