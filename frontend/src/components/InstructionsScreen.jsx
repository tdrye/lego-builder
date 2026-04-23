import { useState } from 'react';
import LegoBrick from './LegoBrick.jsx';

const DIFFICULTY_CONFIG = {
  Easy: { color: '#00852B', bg: '#dcfce7', emoji: '🟢', label: 'Easy Peasy!' },
  Medium: { color: '#FE8A18', bg: '#ffedd5', emoji: '🟡', label: 'Medium' },
  Hard: { color: '#D01012', bg: '#fee2e2', emoji: '🔴', label: 'Challenge!' },
};

const STEP_COLORS = ['#D01012', '#006CB7', '#00852B', '#FE8A18', '#003580', '#7B2FBE', '#95C11F', '#FF69B4', '#FE8A18', '#9BA3A7'];

export default function InstructionsScreen({ instructions, onBack, onAgain }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [showBrickList, setShowBrickList] = useState(false);

  if (!instructions) return null;

  const diff = DIFFICULTY_CONFIG[instructions.difficulty] || DIFFICULTY_CONFIG.Easy;
  const steps = instructions.steps || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero header */}
      <div className="lego-bg px-5 pt-10 pb-6">
        <div className="flex items-center mb-4">
          <button
            onClick={onBack}
            className="brick-btn w-12 h-12 bg-white rounded-2xl shadow-[0_4px_0_#ccc] flex items-center justify-center text-2xl"
          >
            ←
          </button>
          <div className="ml-auto">
            <button
              onClick={onAgain}
              className="brick-btn px-4 py-2 bg-white rounded-xl shadow-[0_3px_0_#ccc] font-fredoka text-gray-700 text-base"
            >
              🔄 New Build
            </button>
          </div>
        </div>

        <div className="text-center">
          <div className="text-6xl mb-2">{instructions.emoji || '🧱'}</div>
          <h1 className="font-fredoka text-3xl text-gray-900 leading-tight">{instructions.title}</h1>
          <p className="font-nunito text-gray-700 text-sm mt-1 px-4">{instructions.description}</p>

          {/* Stats row */}
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            <StatBadge icon="🏗️" label={`${instructions.totalBricks || '?'} bricks`} bg="#003580" text="white" />
            <StatBadge icon="⏱️" label={instructions.estimatedTime || '?'} bg="#003580" text="white" />
            <div
              className="flex items-center gap-1 px-3 py-1.5 rounded-full font-nunito font-bold text-sm"
              style={{ backgroundColor: diff.bg, color: diff.color }}
            >
              {diff.emoji} {diff.label}
            </div>
          </div>
        </div>
      </div>

      {/* Brick list accordion */}
      <div className="bg-white mx-4 mt-4 rounded-2xl shadow-md overflow-hidden">
        <button
          onClick={() => setShowBrickList(!showBrickList)}
          className="w-full flex items-center justify-between px-5 py-4 font-fredoka text-xl text-gray-800"
        >
          <span>🛒 Bricks You Need</span>
          <span className="text-2xl">{showBrickList ? '▲' : '▼'}</span>
        </button>
        {showBrickList && (
          <div className="px-5 pb-5 flex flex-wrap gap-4">
            {(instructions.bricksList || []).map((brick, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <LegoBrick colorHex={brick.colorHex} size={brick.size} />
                <span className="font-nunito text-xs font-bold text-gray-600 text-center">
                  {brick.size}
                </span>
                <span className="font-fredoka text-lg" style={{ color: brick.colorHex }}>
                  ×{brick.quantity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step toggle */}
      <div className="flex mx-4 mt-4 gap-2">
        <button
          onClick={() => setShowAll(false)}
          className={`flex-1 py-2 rounded-xl font-fredoka text-lg transition-all ${!showAll ? 'bg-yellow-400 text-gray-900 shadow-[0_3px_0_#c8a800]' : 'bg-white text-gray-500'}`}
        >
          One Step
        </button>
        <button
          onClick={() => setShowAll(true)}
          className={`flex-1 py-2 rounded-xl font-fredoka text-lg transition-all ${showAll ? 'bg-yellow-400 text-gray-900 shadow-[0_3px_0_#c8a800]' : 'bg-white text-gray-500'}`}
        >
          All Steps
        </button>
      </div>

      {/* Steps */}
      <div className="flex-1 px-4 mt-4 pb-6">
        {showAll ? (
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} color={STEP_COLORS[i % STEP_COLORS.length]} />
            ))}
            {instructions.funFact && <FunFact fact={instructions.funFact} />}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {steps[currentStep] && (
              <StepCard
                step={steps[currentStep]}
                color={STEP_COLORS[currentStep % STEP_COLORS.length]}
                big
              />
            )}

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="brick-btn flex-1 py-4 bg-white rounded-2xl font-fredoka text-2xl text-gray-700 shadow-[0_4px_0_#ccc] disabled:opacity-30"
              >
                ← Back
              </button>

              <div className="font-fredoka text-xl text-gray-700 whitespace-nowrap">
                {currentStep + 1} / {steps.length}
              </div>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="brick-btn flex-1 py-4 rounded-2xl font-fredoka text-2xl text-white shadow-[0_4px_0_#005a9e]"
                  style={{ backgroundColor: '#006CB7' }}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={onAgain}
                  className="brick-btn flex-1 py-4 rounded-2xl font-fredoka text-xl text-gray-900 shadow-[0_4px_0_#c8a800]"
                  style={{ backgroundColor: '#FFD700' }}
                >
                  🎉 Done!
                </button>
              )}
            </div>

            {/* Step dots */}
            <div className="flex justify-center gap-2 flex-wrap">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{
                    backgroundColor: i <= currentStep ? STEP_COLORS[i % STEP_COLORS.length] : '#d1d5db',
                    transform: i === currentStep ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
              ))}
            </div>

            {currentStep === steps.length - 1 && instructions.funFact && (
              <FunFact fact={instructions.funFact} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StepCard({ step, color, big }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden ${big ? 'shadow-lg' : ''}`}>
      {/* Step header */}
      <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: color }}>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-fredoka text-white text-xl">
          {step.stepNumber}
        </div>
        <h3 className="font-fredoka text-white text-xl flex-1">{step.title}</h3>
      </div>

      {/* Step body */}
      <div className="px-5 py-4">
        <p className="font-nunito text-gray-800 text-base leading-relaxed font-semibold mb-4">
          {step.description}
        </p>

        {/* Bricks used */}
        {step.bricksUsed && step.bricksUsed.length > 0 && (
          <div>
            <p className="font-nunito text-gray-500 text-xs font-bold uppercase mb-2">Bricks for this step:</p>
            <div className="flex flex-wrap gap-4">
              {step.bricksUsed.map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <LegoBrick colorHex={b.colorHex} size={b.size} />
                  <span className="font-nunito text-xs font-bold" style={{ color: b.colorHex }}>
                    {b.color} {b.size} ×{b.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tip */}
        {step.tip && (
          <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 flex gap-2">
            <span className="text-xl">💡</span>
            <p className="font-nunito text-yellow-800 text-sm font-bold">{step.tip}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatBadge({ icon, label, bg, text }) {
  return (
    <div
      className="flex items-center gap-1 px-3 py-1.5 rounded-full font-nunito font-bold text-sm"
      style={{ backgroundColor: bg, color: text }}
    >
      {icon} {label}
    </div>
  );
}

function FunFact({ fact }) {
  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex gap-3 items-start">
      <span className="text-2xl">🤓</span>
      <div>
        <p className="font-fredoka text-blue-700 text-lg">Fun Fact!</p>
        <p className="font-nunito text-blue-600 text-sm font-semibold">{fact}</p>
      </div>
    </div>
  );
}
