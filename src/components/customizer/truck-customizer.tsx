"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CybertruckSceneDynamic } from "@/components/scene/cybertruck-scene-dynamic";
import {
  classifyMaterial,
  type SceneFinish,
  type SceneMaterial,
} from "@/components/scene/material-utils";
import { DraggableLogo } from "./draggable-logo";
import type { TruckCustomizerLabels } from "@/types/customizer";

const PRESET_COLORS: string[] = [
  "#2a76a6",
  "#f4f4f5",
  "#3a3f47",
  "#0e0f12",
  "#c4242a",
  "#f08a24",
  "#19b48a",
  "#6a3bd4",
];

const KIND_DEFAULTS: Record<string, string> = {
  body: "#f4f4f5",
  accent: "#6a3bd4",
  ball: "#2a76a6",
  skip: "#1a1d24",
};

const KIND_NAMES: Record<string, string> = {
  body: "Body",
  accent: "Cargo",
  ball: "Orb",
  skip: "Wheel",
};

const MAX_LOGO_SIZE = 2 * 1024 * 1024;
const DEFAULT_LOGO_POSITION = { x: 50, y: 56 };

interface TruckCustomizerProps {
  labels: TruckCustomizerLabels;
  badge?: string;
}

function buildDefaultColors(materials: SceneMaterial[]): Record<number, string> {
  const overrides: Record<number, string> = {};
  materials.forEach((material) => {
    const kind = classifyMaterial(material.name);
    overrides[material.index] = KIND_DEFAULTS[kind] ?? KIND_DEFAULTS.body;
  });
  return overrides;
}

function isGenericName(name: string) {
  const trimmed = (name ?? "").trim();
  if (!trimmed) return true;
  return /^(fallback\s*material|default\s*material|material(\.\d+)?|untitled.*)$/i.test(
    trimmed,
  );
}

function partLabel(material: SceneMaterial, occurrence: number) {
  const kind = classifyMaterial(material.name);
  const kindLabel = KIND_NAMES[kind] ?? "Part";

  if (!isGenericName(material.name)) {
    return material.name.replace(/[._-]+/g, " ").trim();
  }
  return occurrence > 1 ? `${kindLabel} ${occurrence}` : kindLabel;
}

export function TruckCustomizer({ labels, badge }: TruckCustomizerProps) {
  const [materials, setMaterials] = useState<SceneMaterial[]>([]);
  const [overrides, setOverrides] = useState<Record<number, string>>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [finish, setFinish] = useState<SceneFinish>("gloss");
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState(DEFAULT_LOGO_POSITION);
  const [logoScale, setLogoScale] = useState(22);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  const handleMaterialsReady = useCallback((next: SceneMaterial[]) => {
    setMaterials(next);
    if (initializedRef.current) return;
    initializedRef.current = true;

    setOverrides(buildDefaultColors(next));
    setActiveIndex(next[0]?.index ?? null);
  }, []);

  useEffect(() => {
    return () => {
      if (logoSrc?.startsWith("blob:")) URL.revokeObjectURL(logoSrc);
    };
  }, [logoSrc]);

  const labeledMaterials = useMemo(() => {
    const counters: Record<string, number> = {};
    return materials.map((material) => {
      const kind = classifyMaterial(material.name);
      counters[kind] = (counters[kind] ?? 0) + 1;
      return {
        ...material,
        label: partLabel(material, counters[kind]),
      };
    });
  }, [materials]);

  const updateColor = (next: string) => {
    if (activeIndex === null) return;
    setOverrides((prev) => ({ ...prev, [activeIndex]: next }));
  };

  const handleFile = (file: File | null) => {
    if (!file || !file.type.startsWith("image/") || file.size > MAX_LOGO_SIZE) return;
    if (logoSrc?.startsWith("blob:")) URL.revokeObjectURL(logoSrc);
    setLogoSrc(URL.createObjectURL(file));
    setLogoPosition(DEFAULT_LOGO_POSITION);
    setLogoScale(22);
  };

  const removeLogo = () => {
    if (logoSrc?.startsWith("blob:")) URL.revokeObjectURL(logoSrc);
    setLogoSrc(null);
    setLogoPosition(DEFAULT_LOGO_POSITION);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReset = () => {
    setOverrides(buildDefaultColors(materials));
    setFinish("gloss");
    removeLogo();
  };

  const activeColor =
    activeIndex !== null ? overrides[activeIndex] ?? KIND_DEFAULTS.body : KIND_DEFAULTS.body;

  const finishOptions: { value: SceneFinish; label: string }[] = [
    { value: "matte", label: labels.finishMatte },
    { value: "satin", label: labels.finishSatin },
    { value: "gloss", label: labels.finishGloss },
    { value: "chrome", label: labels.finishChrome },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div
        ref={sceneRef}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-[36px] glass-strong"
      >
        <div
          className="absolute inset-12 rounded-full bg-accent-gradient opacity-25 blur-3xl"
          aria-hidden
        />
        <div className="grid-floor pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="relative h-full w-full">
          <CybertruckSceneDynamic
            initialView="showroom"
            materialColors={overrides}
            finish={finish}
            showLogo={false}
            autoRotate
            onMaterialsReady={handleMaterialsReady}
          />
        </div>

        {logoSrc && (
          <DraggableLogo
            src={logoSrc}
            position={logoPosition}
            scale={logoScale}
            onPositionChange={setLogoPosition}
            containerRef={sceneRef}
          />
        )}

        {badge && (
          <div className="pointer-events-none absolute start-6 top-6">
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-zinc-600">
              <span className="pulse-dot" />
              {badge}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 rounded-[36px] bg-white p-6 shadow-xl shadow-accent/5 ring-1 ring-accent/10 sm:p-7">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            {labels.partsTitle}
          </p>
          <div className="mt-2 grid max-h-[160px] grid-cols-2 gap-1.5 overflow-y-auto pr-1">
            {labeledMaterials.length === 0 && (
              <p className="col-span-2 text-xs text-zinc-500">{labels.loading}</p>
            )}
            {labeledMaterials.map((material) => {
              const active = activeIndex === material.index;
              const color = overrides[material.index] ?? KIND_DEFAULTS.body;
              return (
                <button
                  key={material.index}
                  type="button"
                  onClick={() => setActiveIndex(material.index)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-start text-[11px] font-semibold transition ${
                    active
                      ? "bg-accent/10 text-zinc-900 ring-1 ring-accent/30"
                      : "bg-zinc-50 text-zinc-600 ring-1 ring-zinc-200/70 hover:bg-zinc-100"
                  }`}
                  title={material.name}
                >
                  <span
                    className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-black/10"
                    style={{ backgroundColor: color }}
                  />
                  <span className="truncate">{material.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-4 gap-2">
            {PRESET_COLORS.map((preset) => {
              const active = preset.toLowerCase() === activeColor.toLowerCase();
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => updateColor(preset)}
                  aria-pressed={active}
                  aria-label={preset}
                  title={preset}
                  className={`relative aspect-square rounded-2xl ring-2 transition-transform duration-200 hover:scale-105 ${
                    active
                      ? "ring-accent shadow-lg shadow-accent/30"
                      : "ring-zinc-200 hover:ring-zinc-400"
                  }`}
                  style={{ backgroundColor: preset }}
                />
              );
            })}
          </div>

          <label className="mt-3 flex items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-2.5 ring-1 ring-zinc-200/70">
            <input
              type="color"
              value={activeColor}
              onChange={(event) => updateColor(event.target.value)}
              className="h-8 w-10 cursor-pointer rounded-lg border-0 bg-transparent p-0"
              aria-label={labels.customColor}
            />
            <div className="flex-1">
              <p className="text-xs font-semibold text-zinc-900">{labels.customColor}</p>
              <p className="text-[11px] uppercase tracking-widest text-zinc-500">
                {activeColor.toUpperCase()}
              </p>
            </div>
          </label>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            {labels.finishTitle}
          </p>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {finishOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFinish(option.value)}
                aria-pressed={finish === option.value}
                className={`rounded-full px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide transition ${
                  finish === option.value
                    ? "bg-accent text-white shadow-md shadow-accent/30"
                    : "bg-zinc-50 text-zinc-600 ring-1 ring-zinc-200 hover:text-zinc-900"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            {labels.logoTitle}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent-gradient px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-accent/20 transition hover:opacity-90"
            >
              {logoSrc ? labels.logoReplace : labels.logoUpload}
            </button>
            {logoSrc && (
              <button
                type="button"
                onClick={removeLogo}
                className="rounded-full border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:border-accent hover:text-accent"
              >
                {labels.logoRemove}
              </button>
            )}
          </div>
          {logoSrc && (
            <label className="mt-3 block">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                {labels.logoSize}
              </span>
              <input
                type="range"
                min={8}
                max={42}
                value={logoScale}
                onChange={(event) => setLogoScale(Number(event.target.value))}
                className="mt-1 w-full accent-accent"
              />
            </label>
          )}
          <p className="mt-1.5 text-[11px] text-zinc-500">{labels.logoHint}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          />
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-auto rounded-full border border-zinc-200 py-2.5 text-xs font-semibold uppercase tracking-widest text-zinc-700 transition hover:border-accent hover:text-accent"
        >
          {labels.reset}
        </button>
      </div>
    </div>
  );
}
