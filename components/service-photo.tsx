import Image from "next/image";
import type { SeoPage } from "@/lib/pages";
import { serviceImageFor, servicePhotoAlt } from "@/lib/service-images";

type ThumbLayout = "compact" | "card" | "featured";

const THUMB_SIZES: Record<ThumbLayout, string> = {
  /** Topic list column (~112px). */
  compact: "112px",
  /** Standard pick-card in the home grid (~240–320px wide). */
  card: "(max-width: 640px) 90vw, 320px",
  /** Featured pick-card spanning two columns. */
  featured: "(max-width: 900px) 100vw, 640px",
};

type Props = {
  page: SeoPage;
  variant?: "thumb" | "banner";
  priority?: boolean;
  thumbLayout?: ThumbLayout;
};

export function ServicePhoto({
  page,
  variant = "thumb",
  priority = false,
  thumbLayout = "card",
}: Props) {
  const src = serviceImageFor(page);
  const alt = servicePhotoAlt(page);
  if (variant === "banner") {
    return (
      <div className="service-photo-banner">
        <Image src={src} alt={alt} width={1200} height={675} sizes="100vw" priority={priority} className="service-photo-banner-img" />
      </div>
    );
  }
  const thumbSizes = THUMB_SIZES[thumbLayout];
  const thumbWidth = thumbLayout === "featured" ? 800 : thumbLayout === "card" ? 400 : 224;
  const thumbHeight = thumbLayout === "featured" ? 500 : thumbLayout === "card" ? 280 : 168;
  return (
    <div className="service-photo-thumb">
      <Image
        src={src}
        alt=""
        width={thumbWidth}
        height={thumbHeight}
        sizes={thumbSizes}
        priority={priority}
        className="service-photo-thumb-img"
        aria-hidden="true"
      />
    </div>
  );
}
