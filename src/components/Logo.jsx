export function Logo({ compact = false }) {
  return (
    <div className="brand">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="M4 2.5v11L14 8z" />
        </svg>
      </span>
      {!compact && (
        <span>
          <span className="brand-name">WATCHIMPLY</span>
          <span className="brand-tag">YouTube, simplificado</span>
        </span>
      )}
    </div>
  );
}
