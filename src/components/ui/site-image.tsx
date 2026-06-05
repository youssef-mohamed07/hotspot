import Image from "next/image";
import type { ImageAsset } from "@/data/image-assets";

const CLOUDINARY_ASSET_HOST = "https://res.cloudinary.com/";

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
  const alt = ariaHidden ? "" : asset.label;

  if (asset.path.startsWith(CLOUDINARY_ASSET_HOST)) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset.path}
          alt={alt}
          className={`absolute inset-0 h-full w-full ${className ?? ""}`.trim()}
          aria-hidden={ariaHidden}
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset.path}
        alt={alt}
        width={asset.width}
        height={asset.height}
        className={className}
        aria-hidden={ariaHidden}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={asset.path}
        alt={alt}
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
      alt={alt}
      width={asset.width}
      height={asset.height}
      className={className}
      sizes={sizes ?? defaultSizes}
      priority={priority}
      aria-hidden={ariaHidden}
    />
  );
}
