export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <div className="skeleton skel-thumb" />
          <div className="skeleton skel-line" />
          <div className="skeleton skel-line short" />
        </div>
      ))}
    </div>
  );
}
