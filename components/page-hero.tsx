import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { heroImageSrc, heroPhotoAlt, heroVisualCaption, type HeroVisual } from "@/lib/hero-visual";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/pages";

type PageHeroProps = {
  kicker?: string;
  title: string;
  lead: ReactNode;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "home" | "page";
  visual?: HeroVisual;
  /** When set, overrides the default image for this visual (service-specific photo). */
  imageSrc?: string;
  imageAlt?: string;
};

export function PageHero({
  kicker,
  title,
  lead,
  ctaLabel = "Give us a call",
  secondaryHref,
  secondaryLabel,
  variant = "page",
  visual = "home",
  imageSrc: imageSrcProp,
  imageAlt: imageAltProp,
}: PageHeroProps) {
  const imageSrc = imageSrcProp ?? heroImageSrc(visual);
  const imageAlt = imageAltProp ?? heroPhotoAlt(visual);
  const caption = heroVisualCaption(visual);

  return (
    <section className={`welcome-hero welcome-hero--${variant}`} data-visual={visual}>
      <div className="welcome-blob welcome-blob-a" aria-hidden="true" />
      <div className="welcome-blob welcome-blob-b" aria-hidden="true" />
      <div className="wrap welcome-hero-layout">
        <div className="welcome-copy">
          {kicker && <p className="welcome-tag">{kicker}</p>}
          <h1>{title}</h1>
          <div className="welcome-lead">{lead}</div>
          <div className="welcome-actions">
            <a className="call-pill" href={`tel:${PHONE_E164}`}>
              <span className="call-pill-top">{ctaLabel}</span>
              <span className="call-pill-number">{PHONE_DISPLAY}</span>
            </a>
            {secondaryHref && secondaryLabel && (
              <Link className="text-link" href={secondaryHref}>{secondaryLabel} →</Link>
            )}
          </div>
        </div>
        <aside className="welcome-art" aria-label="Illustration">
          <div className="welcome-art-ring">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={900}
              priority={variant === "home"}
              sizes="(max-width: 900px) 90vw, 42vw"
              className="welcome-art-img"
            />
          </div>
          <p className="welcome-art-note">{caption}</p>
        </aside>
      </div>
    </section>
  );
}
