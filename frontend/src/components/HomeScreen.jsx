export default function HomeScreen({ onCamera, onCategory }) {
  return (
    <div className="lego-bg min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center pt-12 pb-6 px-6">
        <div className="text-7xl mb-3 animate-bounce">🧱</div>
        <h1 className="font-fredoka text-5xl text-gray-900 leading-none tracking-wide">BrickBot</h1>
        <p className="font-nunito font-700 text-gray-800 text-lg mt-2 text-center">
          Turn anything into a LEGO model!
        </p>
      </div>

      {/* Decorative bricks row */}
      <div className="flex justify-center gap-2 mb-8">
        {['#D01012','#006CB7','#00852B','#FE8A18','#003580'].map((c, i) => (
          <Stud key={i} color={c} />
        ))}
      </div>

      {/* Main buttons */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
        <button
          onClick={onCamera}
          className="brick-btn w-full max-w-sm py-7 flex flex-col items-center gap-2 rounded-3xl shadow-[0_7px_0_#8B0000]"
          style={{ backgroundColor: '#D01012' }}
        >
          <span className="text-5xl">📷</span>
          <span className="font-fredoka text-white text-3xl">Take a Photo</span>
          <span className="font-nunito text-red-100 text-base">Snap something to build!</span>
        </button>

        <button
          onClick={onCategory}
          className="brick-btn w-full max-w-sm py-7 flex flex-col items-center gap-2 rounded-3xl shadow-[0_7px_0_#00571e]"
          style={{ backgroundColor: '#00852B' }}
        >
          <span className="text-5xl">🗂️</span>
          <span className="font-fredoka text-white text-3xl">Pick a Category</span>
          <span className="font-nunito text-green-100 text-base">Animals, Space & more!</span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 pt-4">
        <p className="font-nunito text-gray-700 text-sm font-semibold">
          For builders ages 0–99 🌟
        </p>
      </div>
    </div>
  );
}

function Stud({ color }) {
  return (
    <div
      className="w-10 h-10 rounded-full shadow-md border-2 border-black/10"
      style={{ backgroundColor: color }}
    />
  );
}
