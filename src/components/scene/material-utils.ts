export type SceneFinish = "matte" | "satin" | "gloss" | "chrome";

export interface SceneMaterial {
  index: number;
  name: string;
}

export function classifyMaterial(
  name: string,
): "skip" | "body" | "accent" | "ball" {
  const n = (name ?? "").toLowerCase();
  if (/(tire|tyre|wheel|rubber|rim|brake|disc)/.test(n)) return "skip";
  if (/(glass|window|mirror|light|lamp|head|tail|signal)/.test(n)) return "skip";
  if (/(ball|sphere|orb|globe|moon|planet)/.test(n)) return "ball";
  if (/(box|cargo|bed|container|panel|stripe|band|trim|accent)/.test(n))
    return "accent";
  return "body";
}
