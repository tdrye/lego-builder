import { useEffect, useState } from 'react';

const MESSAGES = [
  'Counting bricks... 🧱',
  'Designing your model... 📐',
  'Picking the best colors... 🎨',
  'Sorting the pieces... 🔢',
  'BrickBot is thinking hard! 🤔',
  'Almost ready to build! ⚡',
  'Making it kid-friendly! ⭐',
];

const BRICK_COLORS = ['#D01012', '#006CB7', '#00852B', '#FE8A18', '#003580', '#7B2FBE', '#FFD700'];

export default function LoadingScreen() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [bricks, setBricks] = useState([]);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx((i) => (i + 1) % MESSAGES.length);
    }, 1500);
    return () => clearInterval(msgTimer);
  }, []);

  useEffect(() => {
    const brickTimer = setInterval(() => {
      setBricks((b) => {
        const newBrick = {
          id: Date.now(),
          color: BRICK_COLORS[Math.floor(Math.random() * BRICK_COLORS.length)],
          x: Math.random() * 80 + 10,
          size: Math.random() > 0.5 ? '2x4' : '2x2',
          delay: 0,
        };
        return [...b.slice(-12), newBrick];
      });
    }, 400);
    return () => clearInterval(brickTimer);
  }, []);

  return (
    <div className="lego-bg min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Floating bricks */}
      <div className="fixed inset-0 pointer-events-none">
        {bricks.map((brick) => (
          <FloatingBrick key={brick.id} color={brick.color} x={brick.x} size={brick.size} />
        ))}
      </div>

      {/* Center card */}
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl w-80 relative z-10 border-4 border-yellow-400">
        {/* Animated brick stack */}
        <div className="flex flex-col items-center mb-5">
          <BrickStack />
        </div>

        <h2 className="font-fredoka text-3xl text-gray-900 mb-2">BrickBot is Working!</h2>
        <p
          key={msgIdx}
          className="font-nunito font-bold text-gray-500 text-base animate-brick-drop min-h-[2rem]"
        >
          {MESSAGES[msgIdx]}
        </p>

        <div className="mt-4 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-yellow-400"
              style={{ animation: `bounce 1s ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BrickStack() {
  const layers = [
    { color: '#D01012', studs: 4, width: 100 },
    { color: '#006CB7', studs: 3, width: 80 },
    { color: '#00852B', studs: 2, width: 60 },
  ];

  return (
    <div className="flex flex-col items-center gap-1">
      {layers.map((layer, i) => (
        <div
          key={i}
          className="relative rounded-md flex items-end justify-evenly pb-1"
          style={{
            width: layer.width,
            height: 28,
            backgroundColor: layer.color,
            boxShadow: `0 4px 0 ${darken(layer.color)}`,
            animation: `brickDrop 0.5s ${i * 0.15}s ease both`,
          }}
        >
          {Array.from({ length: layer.studs }).map((_, j) => (
            <div
              key={j}
              className="rounded-full border border-black/10"
              style={{
                width: 12,
                height: 12,
                backgroundColor: layer.color,
                boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function FloatingBrick({ color, x, size }) {
  const isLarge = size === '2x4';
  return (
    <div
      className="absolute bottom-0 opacity-60"
      style={{
        left: `${x}%`,
        width: isLarge ? 60 : 36,
        height: 22,
        backgroundColor: color,
        borderRadius: 6,
        boxShadow: `0 3px 0 ${darken(color)}`,
        animation: 'floatUp 3s linear forwards',
      }}
    />
  );
}

function darken(hex) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (num >> 16) - 40);
  const g = Math.max(0, ((num >> 8) & 0xff) - 40);
  const b = Math.max(0, (num & 0xff) - 40);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
