export default function Result({ result, onRestart }) {
  if (!result) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Result not found.</p>
        <button
          onClick={onRestart}
          className="mt-6 px-4 py-2 rounded-lg bg-gray-900 text-white"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-semibold mb-4">{result.name}</h2>
      <p className="mb-3">{result.summary}</p>
      <p className="text-gray-500">
        Recommended notes: {result.suggestions.join(", ")}
      </p>

      <button
        onClick={onRestart}
        className="mt-8 px-4 py-2 rounded-lg bg-gray-900 text-white hover:opacity-90 transition"
      >
        Restart
      </button>
    </div>
  );
}
