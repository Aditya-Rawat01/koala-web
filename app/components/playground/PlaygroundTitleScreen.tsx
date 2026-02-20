export default function PlaygroundTitleScreen({
  onEnter,
}: {
  onEnter: () => void;
}) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white transition-all px-6">
      <h1 className="text-5xl font-bold mb-4">Koala 🐨</h1>

      <p className="text-sm opacity-70 mb-6">
        Lightweight Self-hosted API monitoring for devs
      </p>

      <div className="max-w-md mb-8 p-4 rounded-lg bg-white/5 border border-white/10 text-left text-sm text-white/80 space-y-2">
        <p className="font-semibold text-white/90">Browser Playground limitations:</p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li>Endpoints must have CORS enabled</li>
          <li>Only HTTP/HTTPS — no WebSocket (ws/wss)</li>
          <li>No data stored — requests go directly from your browser</li>
        </ul>
      </div>

      <button
        onClick={onEnter}
        className="px-6 py-3 bg-gray-900 dark:bg-white dark:text-black text-white rounded-xl hover:scale-105 transition"
      >
        Enter Dashboard
      </button>
    </div>
  );
}
