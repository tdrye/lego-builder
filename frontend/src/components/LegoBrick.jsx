function darken(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - 50);
  const g = Math.max(0, ((num >> 8) & 0xff) - 50);
  const b = Math.max(0, (num & 0xff) - 50);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default function LegoBrick({ colorHex = '#FFD700', size = '2x2', label }) {
  const [w] = size.split('x').map(Number);
  const studCount = Math.min(w, 4);
  const brickWidth = Math.max(40, studCount * 22);

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Brick body */}
      <div
        className="relative flex items-center justify-evenly rounded-md"
        style={{
          width: brickWidth,
          height: 26,
          backgroundColor: colorHex,
          boxShadow: `0 4px 0 ${darken(colorHex)}, inset 0 1px 0 rgba(255,255,255,0.3)`,
          border: `1.5px solid ${darken(colorHex)}`,
        }}
      >
        {/* Studs */}
        {Array.from({ length: studCount }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundColor: colorHex,
              border: `1.5px solid ${darken(colorHex)}`,
              boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>
      {/* Label */}
      {label && (
        <span className="font-nunito font-bold text-xs text-gray-600 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
