import Image from "next/image";
import type { SeoPage } from "@/lib/pages";
import { serviceImageFor } from "@/lib/service-images";
import { heroPhotoAlt, heroVisualFor } from "@/lib/hero-visual";

type Props = {
  page: SeoPage;
  variant?: "thumb" | "banner";
  priority?: boolean;
};

export function ServicePhoto({ page, variant = "thumb", priority = false }: Props) {
  const src = serviceImageFor(page);
  const alt = heroPhotoAlt(heroVisualFor(page));
  if (variant === "banner") {
    return (
      <div className="service-photo-banner">
        <Image src={src} alt={alt} width={1200} height={675} sizes="100vw" priority={priority} className="service-photo-banner-img" />
      </div>
    );
  }
  return (
    <div className="service-photo-thumb">
      <Image src={src} alt="" width={400} height={280} sizes="120px" className="service-photo-thumb-img" aria-hidden="true" />
    </div>
  );
}
