"use client";

import { useEffect, useRef, useState } from "react";
import type { PlaygroundMonitor } from "@/app/lib/playground/types";
import toast from "react-hot-toast";

export function PlaygroundModal({
  modalMode,
  setModalMode,
  onAdd,
  onUpdate,
  theme,
  setTheme,
}: {
  modalMode: { type: "create" } | { type: "edit"; monitor: PlaygroundMonitor } | null;
  setModalMode: React.Dispatch<
    React.SetStateAction<
      { type: "create" } | { type: "edit"; monitor: PlaygroundMonitor } | null
    >
  >;
  onAdd: (m: Omit<PlaygroundMonitor, "id" | "created_at">) => void;
  onUpdate: (m: PlaygroundMonitor) => void;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}) {
  const isEdit = modalMode?.type === "edit";
  const monitor = isEdit ? modalMode.monitor : null;
  const [protocol, setProtocol] = useState("https");
  const [host, setHost] = useState("");
  const [method, setMethod] = useState("GET");
  const [expectedStatus, setExpectedStatus] = useState("200");
  const [intervalSec, setIntervalSec] = useState("");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const isWebSocket = protocol === "ws" || protocol === "wss";

  useEffect(() => {
    if (isEdit && monitor) {
      try {
        const url = new URL(monitor.endpoint);
        setProtocol(url.protocol.replace(":", ""));
        setHost(url.host + url.pathname + url.search);
        setIntervalSec(monitor.interval.toString());
        setMethod(monitor.method);
        setExpectedStatus(
          monitor.expected_status ? monitor.expected_status.toString() : "200"
        );
        setHeaders(
          monitor.headers
            ? JSON.stringify(monitor.headers, null, 2)
            : ""
        );
        setBody(monitor.body ?? "");
      } catch {
        setProtocol("https");
        setHost("");
      }
    } else {
      setProtocol("https");
      setHost("");
      setMethod("GET");
      setExpectedStatus("200");
      setIntervalSec("");
      setHeaders("");
      setBody("");
    }
  }, [modalMode, isEdit, monitor]);

  const handleSave = () => {
    let endpoint: string;
    try {
      endpoint = `${protocol}://${host.replace(/^\/+/, "")}`;
      new URL(endpoint);
    } catch {
      toast.error("Invalid endpoint URL");
      return;
    }

    const parsedInterval = Number(intervalSec);
    const parsedExpectedStatus = Number(expectedStatus || 200);

    if (parsedInterval < 5) {
      toast.error("Minimum interval is 5 seconds");
      return;
    }

    if (isWebSocket) {
      toast.error("WebSocket is not supported in browser-based playground. Use HTTP/HTTPS.");
      return;
    }

    let parsedHeaders: Record<string, string> | undefined;
    try {
      if (headers.trim()) {
        parsedHeaders = JSON.parse(headers) as Record<string, string>;
      }
    } catch {
      toast.error("Invalid headers JSON");
      return;
    }

    let parsedBody: string | undefined;
    try {
      if (body.trim()) {
        parsedBody = body.trim();
      }
    } catch {
      toast.error("Invalid body JSON");
      return;
    }

    const base = {
      endpoint,
      method,
      expected_status: parsedExpectedStatus,
      interval: parsedInterval,
      headers: parsedHeaders,
      body: parsedBody,
    };

    if (isEdit && monitor) {
      onUpdate({ ...monitor, ...base });
    } else {
      onAdd(base);
    }

    setModalMode(null);
  };

  return (
    <>
    <div className="h-full w-full flex items-center justify-between mb-6">
      <div className="flex gap-2 items-center">
        <h1 className="text-3xl font-bold">Koala</h1>
        <h1 className="text-3xl">🐨</h1>
        <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
          Playground
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          className="py-2 px-3 rounded-full w-10 h-10 flex items-center justify-center transition hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          {theme === "light" ? "🌕" : "☀️"}
        </button>
        <button
          onClick={() => setModalMode({ type: "create" })}
          className="bg-gray-800 dark:bg-white dark:text-gray-800 text-white px-4 py-2 rounded hidden md:block"
        >
          + Add Monitor
        </button>
        <button
          className="md:hidden justify-center fixed bottom-6 right-6 bg-gray-800 text-white dark:bg-white dark:text-gray-800 w-16 h-16 text-4xl rounded-full shadow-md shadow-neutral-800 flex items-center"
          onClick={() => setModalMode({ type: "create" })}
        >
          +
        </button>
      </div>
    </div>

    {modalMode && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-neutral-900 w-[95vw] max-w-xl max-h-[90vh] overflow-y-auto p-8 rounded-2xl shadow-xl flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-4">
            {modalMode.type === "edit" ? "Edit Monitor" : "Add Monitor"}
          </h2>

          {(protocol === "http" || protocol === "https") && (
            <MethodDropdown
              value={method}
              options={["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"]}
              onChange={(v) => setMethod(v)}
              className="relative w-full"
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
            <MethodDropdown
              value={protocol}
              options={["http", "https"]}
              onChange={(v) => setProtocol(v)}
              className="relative w-full sm:w-40"
            />
            <input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="api.example.com/health"
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
            />
          </div>

          <input
            placeholder="Interval (seconds, min 5)"
            type="text"
            inputMode="numeric"
            value={intervalSec}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
            onChange={(e) => {
              const v = e.target.value;
              if (/^\d*$/.test(v)) setIntervalSec(v);
            }}
          />

          {!isWebSocket && (
            <input
              inputMode="numeric"
              value={expectedStatus}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d*$/.test(v)) setExpectedStatus(v);
              }}
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
              placeholder="Expected Status (e.g. 200)"
            />
          )}

          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition font-mono text-sm"
            placeholder='Headers JSON (optional) e.g. {"Authorization": "Bearer xyz"}'
            rows={2}
          />

          {!["GET", "HEAD"].includes(method) && (
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition font-mono text-sm"
              placeholder="Body JSON (optional)"
              rows={3}
            />
          )}

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Note: Endpoints must allow CORS for browser-based pinging to work.
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setModalMode(null)}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!host.trim() || !intervalSec || Number(intervalSec) < 5}
              className={`px-3 py-1 rounded ${
                !host.trim() || !intervalSec || Number(intervalSec) < 5
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-gray-800 dark:bg-white dark:text-gray-800 text-white"
              }`}
            >
              {isEdit ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

function MethodDropdown({
  value,
  className,
  options,
  onChange,
}: {
  value: string;
  className: string;
  options: string[];
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={className}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
      >
        {value}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute mt-2 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-50">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${
                value === opt ? "font-semibold" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
