export function ShaftGraphic({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`shaft-graphic ${compact ? "shaft-graphic-sm" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="48" y="8" width="104" height="304" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.35" />
        <line x1="48" y1="40" x2="152" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="48" y1="120" x2="152" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="48" y1="200" x2="152" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="48" y1="280" x2="152" y2="280" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <rect x="62" y="132" width="76" height="72" rx="3" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="2" />
        <rect x="72" y="148" width="24" height="48" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="104" y="148" width="24" height="48" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="124" r="4" fill="var(--accent)" />
        <path d="M100 100v16M94 106h12" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {!compact && <p className="shaft-caption">Dispatch · Diagnose · Sign off</p>}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
