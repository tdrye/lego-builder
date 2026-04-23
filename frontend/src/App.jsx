import { useState } from 'react';
import HomeScreen from './components/HomeScreen.jsx';
import PhotoCapture from './components/PhotoCapture.jsx';
import CategorySelect from './components/CategorySelect.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import InstructionsScreen from './components/InstructionsScreen.jsx';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [instructions, setInstructions] = useState(null);
  const [error, setError] = useState(null);

  async function generate(payload) {
    setScreen('loading');
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Something went wrong');
      setInstructions(data.instructions);
      setScreen('instructions');
    } catch (err) {
      setError(err.message);
      setScreen('error');
    }
  }

  function goHome() {
    setScreen('home');
    setInstructions(null);
    setError(null);
  }

  if (screen === 'home') return <HomeScreen onCamera={() => setScreen('camera')} onCategory={() => setScreen('category')} />;
  if (screen === 'camera') return <PhotoCapture onGenerate={generate} onBack={goHome} />;
  if (screen === 'category') return <CategorySelect onGenerate={generate} onBack={goHome} />;
  if (screen === 'loading') return <LoadingScreen />;
  if (screen === 'instructions') return <InstructionsScreen instructions={instructions} onBack={goHome} onAgain={() => setScreen('home')} />;

  // Error screen
  return (
    <div className="lego-bg min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
        <div className="text-6xl mb-4">😬</div>
        <h2 className="font-fredoka text-2xl text-red-600 mb-3">Oops! Something broke!</h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{error}</p>
        <button onClick={goHome} className="brick-btn w-full py-4 bg-lego-yellow text-gray-900 font-bold text-xl rounded-2xl shadow-[0_5px_0_#c8a800]">
          Try Again 🔄
        </button>
      </div>
    </div>
  );
}
