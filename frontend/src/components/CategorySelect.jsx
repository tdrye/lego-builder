import { useState } from 'react';

const CATEGORIES = [
  { emoji: '🐘', label: 'Animals', examples: ['elephant', 'cat', 'dog', 'dinosaur'] },
  { emoji: '🚗', label: 'Vehicles', examples: ['race car', 'truck', 'airplane', 'rocket ship'] },
  { emoji: '🏠', label: 'Buildings', examples: ['house', 'castle', 'lighthouse', 'fire station'] },
  { emoji: '🚀', label: 'Space', examples: ['rocket', 'astronaut', 'spaceship', 'moon rover'] },
  { emoji: '🍕', label: 'Food', examples: ['pizza slice', 'ice cream cone', 'hot dog', 'cupcake'] },
  { emoji: '🌳', label: 'Nature', examples: ['tree', 'flower', 'mushroom', 'cactus'] },
  { emoji: '🦕', label: 'Dinos', examples: ['T-Rex', 'triceratops', 'brachiosaurus', 'pterodactyl'] },
  { emoji: '🤖', label: 'Robots', examples: ['friendly robot', 'robot dog', 'droid', 'mech'] },
  { emoji: '🐠', label: 'Ocean', examples: ['fish', 'shark', 'dolphin', 'crab'] },
  { emoji: '⚽', label: 'Sports', examples: ['soccer ball', 'basketball hoop', 'trophy', 'skateboard'] },
  { emoji: '🐉', label: 'Fantasy', examples: ['dragon', 'unicorn', 'wizard tower', 'knight'] },
  { emoji: '🎮', label: 'Games', examples: ['game controller', 'pixel character', 'treasure chest', 'sword'] },
];

const BRICK_COLORS = ['#D01012','#006CB7','#00852B','#FE8A18','#003580','#7B2FBE'];

export default function CategorySelect({ onGenerate, onBack }) {
  const [selected, setSelected] = useState(null);
  const [custom, setCustom] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  function handleGenerate() {
    if (useCustom && custom.trim()) {
      onGenerate({ subject: custom.trim(), category: 'custom' });
    } else if (selected) {
      const cat = CATEGORIES[selected];
      const randomExample = cat.examples[Math.floor(Math.random() * cat.examples.length)];
      onGenerate({ subject: randomExample, category: cat.label });
    }
  }

  const canGo = (useCustom && custom.trim()) || (!useCustom && selected !== null);

  return (
    <div className="lego-bg min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center p-5 pt-10">
        <button onClick={onBack} className="brick-btn w-12 h-12 bg-white rounded-2xl shadow-[0_4px_0_#ccc] flex items-center justify-center text-2xl">
          ←
        </button>
        <h2 className="font-fredoka text-3xl text-gray-900 ml-4">Pick a Category</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32">
        {/* Category grid */}
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-5">
          {CATEGORIES.map((cat, i) => (
            <button
              key={i}
              onClick={() => { setSelected(i); setUseCustom(false); }}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md transition-all font-nunito font-bold text-sm ${
                selected === i && !useCustom
                  ? 'ring-4 ring-white scale-105 shadow-xl'
                  : 'opacity-90'
              }`}
              style={{ backgroundColor: BRICK_COLORS[i % BRICK_COLORS.length] }}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-white text-xs font-extrabold">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Custom input */}
        <div className="max-w-sm mx-auto">
          <p className="font-fredoka text-gray-800 text-xl text-center mb-2">
            — or type anything! —
          </p>
          <input
            type="text"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setUseCustom(true); setSelected(null); }}
            placeholder="e.g. my dog, a pirate ship..."
            className="w-full px-5 py-4 rounded-2xl text-lg font-nunito font-bold border-4 border-white shadow-lg outline-none focus:border-yellow-400 bg-white text-gray-800"
          />
        </div>
      </div>

      {/* Sticky build button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-yellow-400 via-yellow-400/95 to-transparent pt-8">
        <button
          onClick={handleGenerate}
          disabled={!canGo}
          className={`brick-btn w-full max-w-sm mx-block py-5 font-fredoka text-2xl text-gray-900 rounded-2xl block mx-auto transition-all ${
            canGo
              ? 'shadow-[0_6px_0_#c8a800] opacity-100'
              : 'opacity-40 shadow-none cursor-not-allowed'
          }`}
          style={{ backgroundColor: canGo ? '#fff' : '#eee' }}
        >
          🧱 Build It! Let's Go!
        </button>
      </div>
    </div>
  );
}
