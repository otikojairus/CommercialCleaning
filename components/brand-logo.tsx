export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`wordmark${compact ? " wordmark-compact" : ""}`}>
      <span className="wordmark-mark" aria-hidden="true">✦</span>
      <span className="wordmark-text">
        <span className="wordmark-name">Commercial Cleaning</span>
        <span className="wordmark-tld">.com</span>
      </span>
    </span>
  );
}
