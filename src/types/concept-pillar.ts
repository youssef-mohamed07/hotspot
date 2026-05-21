import type { SVGProps, ReactElement } from "react";

export interface ConceptPillarData {
  title: string;
  subtitle: string;
  description: string;
  Icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  image: string;
  bullets: string[];
  metric: { value: string; label: string };
}
