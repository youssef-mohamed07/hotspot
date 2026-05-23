import Image from "next/image";
import type { ImageAsset } from "@/data/image-assets";

type SiteImageProps = {
  asset: ImageAsset;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  "aria-hidden"?: boolean;
};

export function SiteImage({
  asset,
  className,
  fill,
  sizes,
  priority,
  "aria-hidden": ariaHidden,
}: SiteImageProps) {
  const defaultSizes = `(max-width: 1200px) 100vw, ${asset.width}px`;

  if (fill) {
    return (
      <Image
        src={asset.path}
        alt={ariaHidden ? "" : asset.label}
        fill
        className={className}
        sizes={sizes ?? defaultSizes}
        priority={priority}
        aria-hidden={ariaHidden}
      />
    );
  }

  return (
    <Image
      src={asset.path}
      alt={ariaHidden ? "" : asset.label}
      width={asset.width}
      height={asset.height}
      className={className}
      sizes={sizes ?? defaultSizes}
      priority={priority}
      aria-hidden={ariaHidden}
    />
  );
}
