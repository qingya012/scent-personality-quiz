export default function Cover({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* 4-corner blended gradient background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at top left,  rgba(247,182,194,0.95), rgba(247,182,194,0) 55%),
            radial-gradient(circle at top right, rgba(255,224,138,0.95), rgba(255,224,138,0) 55%),
            radial-gradient(circle at bottom left, rgba(127,178,138,0.95), rgba(127,178,138,0) 55%),
            radial-gradient(circle at bottom right,rgba(242,162,107,0.95), rgba(242,162,107,0) 55%)
          `,
          backgroundColor: "white",
        }}
      />

      {/* content */}
      <div className="relative w-full max-w-xl px-6 text-center">
        <div className="backdrop-blur-sm bg-white/55 border border-white/60 rounded-3xl p-10 shadow-sm">
          <p className="text-sm tracking-widest text-gray-700">WELCOME</p>
          <p className="mt-3 text-xs tracking-widest text-gray-600">TO</p>
          <h1 className="mt-4 text-4xl font-semibold text-gray-900 leading-tight">
            Scent Personality Quiz
          </h1>

          <button
            onClick={onStart}
            className="mt-10 w-full py-3 rounded-xl bg-gray-900 text-white hover:opacity-90 transition"
          >
            Start
          </button>

          <p className="mt-4 text-xs text-gray-600">
            10 questions · 4 scent personas
          </p>
        </div>
      </div>
    </div>
  );
}
