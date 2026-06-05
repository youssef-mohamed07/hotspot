"use client";

import { useEffect } from "react";
import { Reveal } from "@/components/reveal";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { useDictionary } from "@/i18n/locale-provider";
import type { CaseStudy } from "@/data/case-studies";
import { imageAssets } from "@/data/image-assets";

const KORA_BREAK_MODEL_SRC =
  "/Cybertruck%203D/Cyber%20Truck%20Koora%20Break.glb";

const CASE_STUDY_VIDEOS: (string | undefined)[] = [
  "https://res.cloudinary.com/deq01sbkp/video/upload/v1780659600/kora-break_tta4ob_urar5p.mp4",
  "https://res.cloudinary.com/deq01sbkp/video/upload/v1780659611/Taw_cykrjr_pum9cf.mp4",
];

const VIDEO_CONTROL_LABELS = {
  mute: "Mute",
  unmute: "Unmute",
};

const CLOUDINARY_TRANSFORMATION_SEGMENT_PATTERN =
  /^(?:w_|h_|c_|g_|q_|f_|e_|dpr_|t_)/;

function getCloudinaryTransformationSegments(src: string) {
  const uploadMarker = "/upload/";
  const uploadIndex = src.indexOf(uploadMarker);

  if (!src.startsWith("https://res.cloudinary.com/") || uploadIndex === -1) {
    return [];
  }

  return src
    .slice(uploadIndex + uploadMarker.length)
    .split("/")
    .filter((segment) =>
      CLOUDINARY_TRANSFORMATION_SEGMENT_PATTERN.test(segment),
    );
}

export function CaseStudiesSection() {
  const dict = useDictionary();
  const caseStudies: CaseStudy[] = dict.caseStudies.items.map((item) => ({
    ...item,
    image: "",
  }));

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    CASE_STUDY_VIDEOS.forEach((src, index) => {
      if (!src) {
        return;
      }

      const transformationSegments = getCloudinaryTransformationSegments(src);
      const details = {
        index,
        src,
        transformationSegments,
        isOriginalAssetUrl: transformationSegments.length === 0,
      };

      if (transformationSegments.length > 0) {
        console.warn(
          "[cloudinary-audit] Case study video uses Cloudinary transformations.",
          details,
        );
        return;
      }

      console.info(
        "[cloudinary-audit] Case study video uses original Cloudinary asset URL.",
        details,
      );
    });
  }, []);

  return (
    <section
      id="cases"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div
        className="grid-floor pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[100rem] px-6">
        <Reveal className="mb-14 max-w-3xl text-start">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              {dict.caseStudies.eyebrow}
            </p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {dict.caseStudies.headline1}
            <br />
            <span className="text-gradient-accent">
              {dict.caseStudies.headlineAccent}
            </span>
          </h2>
        </Reveal>

        <div className="flex flex-col gap-10 lg:gap-14">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.08}>
              <CaseStudyCard
                study={cs}
                index={i}
                image={imageAssets.caseStudies[i] ?? imageAssets.caseStudies[0]}
                videoSrc={CASE_STUDY_VIDEOS[i]}
                modelSrc={i === 0 ? KORA_BREAK_MODEL_SRC : undefined}
                modelAlt={i === 0 ? dict.caseStudies.kooraModelAlt : undefined}
                modelControlsLabels={
                  i === 0 ? dict.caseStudies.modelControls : undefined
                }
                videoControlsLabels={VIDEO_CONTROL_LABELS}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
