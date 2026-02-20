"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GraphModal from "../GraphModal";
import { PlaygroundModal } from "./PlaygroundModal";
import { pingEndpoint } from "@/app/lib/playground/ping";
import type { PlaygroundMonitor, GraphPoint } from "@/app/lib/playground/types";
import {
  loadMonitorsFromStorage,
  saveMonitorsToStorage,
  generateId,
} from "@/app/lib/playground/types";
import toast from "react-hot-toast";

export default function PlaygroundDashboard() {
  const [monitors, setMonitors] = useState<PlaygroundMonitor[]>(() => {
    if (typeof window === "undefined") return [];
    return loadMonitorsFromStorage();
  });
  const [modalMode, setModalMode] = useState<
    { type: "create" } | { type: "edit"; monitor: PlaygroundMonitor } | null
  >(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const theme = localStorage.getItem("koala-theme")
    if (theme == "dark") { return "dark"}
    else { return "light"}
  });
  const [graphMonitorId, setGraphMonitorId] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<GraphPoint[]>([]);
  const graphMonitorRef = useRef<string | null>(null);
  const intervalRefs = useRef<Map<string, ReturnType<typeof setInterval>>>(
    new Map(),
  );
  const graphHistoryRef = useRef<Map<string, GraphPoint[]>>(new Map());

  useEffect(() => {
    saveMonitorsToStorage(monitors);
  }, [monitors]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    graphMonitorRef.current = graphMonitorId;
  }, [graphMonitorId]);

  const runPing = useCallback(async (m: PlaygroundMonitor) => {
    let headers: Record<string, string> | undefined;
    if (m.headers && Object.keys(m.headers).length > 0) {
      headers = m.headers;
    }

    const result = await pingEndpoint(
      m.endpoint,
      m.method,
      m.expected_status,
      headers,
      m.body,
    );

    const point: GraphPoint = {
      timestamp: Date.now(),
      latency: result.latency,
      success: result.success,
    };

    setMonitors((prev) =>
      prev.map((mon) =>
        mon.id === m.id
          ? {
              ...mon,
              success: result.success,
              statusCode: result.statusCode,
              latency: result.latency,
            }
          : mon,
      ),
    );

    const history = graphHistoryRef.current.get(m.id) ?? [];
    const updatedHistory = [...history, point].slice(-30);
    graphHistoryRef.current.set(m.id, updatedHistory);

    if (graphMonitorRef.current === m.id) {
      setGraphData(updatedHistory);
    }
  }, []);

  // Only re-run interval setup when monitor config changes (add/remove/edit),
  // NOT when success/latency/statusCode updates from pings
  const monitorConfigKey = useMemo(
    () =>
      monitors
        .map(
          (m) =>
            `${m.id}|${m.endpoint}|${m.method}|${m.interval}|${m.expected_status}`,
        )
        .sort()
        .join(";;"),
    [
      monitors.map((m) => m.id).join(","),
      monitors
        .map(
          (m) => `${m.endpoint}|${m.method}|${m.interval}|${m.expected_status}`,
        )
        .join("||"),
    ],
  );

  useEffect(() => {
    intervalRefs.current.forEach((id) => clearInterval(id));
    intervalRefs.current.clear();

    monitors.forEach((m) => {
      const ms = Math.max(5000, m.interval * 1000);
      runPing(m);
      const id = setInterval(() => runPing(m), ms);
      intervalRefs.current.set(m.id, id);
    });

    return () => {
      intervalRefs.current.forEach((id) => clearInterval(id));
      intervalRefs.current.clear();
    };
  }, [monitorConfigKey, runPing]);

  useEffect(() => {
    if (!graphMonitorId) {
      setGraphData([]);
      return;
    }
    const history = graphHistoryRef.current.get(graphMonitorId) ?? [];
    setGraphData(history);
  }, [graphMonitorId]);

  const handleAddMonitor = (
    monitor: Omit<PlaygroundMonitor, "id" | "created_at">,
  ) => {
    const newMonitor: PlaygroundMonitor = {
      ...monitor,
      id: generateId(),
      created_at: new Date().toISOString(),
    };
    setMonitors((prev) => [newMonitor, ...prev]);
    toast.success("Monitor added");
  };

  const handleUpdateMonitor = (updated: PlaygroundMonitor) => {
    setMonitors((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    toast.success("Monitor updated");
  };

  const handleDelete = (id: string) => {
    setMonitors((prev) => prev.filter((m) => m.id !== id));
    if (graphMonitorId === id) setGraphMonitorId(null);
    toast.success("Monitor deleted");
  };

  return (
    <div className="min-h-screen bg-neutral-200 dark:bg-neutral-950 dark:bg-[radial-gradient(circle_at_top,_#1f2937_0%,_#0a0a0a_70%)] text-gray-800 dark:text-white px-4 py-6 sm:px-8">
      <PlaygroundModal
        modalMode={modalMode}
        setModalMode={setModalMode}
        onAdd={handleAddMonitor}
        onUpdate={handleUpdateMonitor}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {monitors.map((m) => (
          <div
            key={m.id}
            className="bg-neutral-50 dark:bg-neutral-900/60 border dark:border-neutral-700/50 rounded-2xl p-5 shadow-lg hover:shadow-xl dark:hover:border-neutral-600 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full
              ${
                m.success === undefined
                  ? "dark:bg-neutral-700/40 text-neutral-400"
                  : m.success
                    ? `bg-green-500/10 ${m.latency && m.latency < 300 ? "text-green-400" : "text-yellow-400"}`
                    : "bg-red-500/10 text-red-400"
              }
              `}
                >
                  {m.success === undefined
                    ? "Waiting"
                    : m.success
                      ? `UP • ${m.latency}ms`
                      : `DOWN • ${m.statusCode ?? "Network"}`}
                </span>
              </div>

              <span className="text-xs dark:text-white">{m.interval}s</span>
            </div>
            <div className="flex flex-col justify-center w-full p-2">
              <p className="font-semibold">Method: {m.method}</p>
              <p>Endpoint: {m.endpoint}</p>
            </div>

            <div className="px-2 w-full">
              <button
                onClick={() => setGraphMonitorId(m.id)}
                className="p-2 w-full text-sm dark:text-white border-2 rounded-md hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-800 transition-all duration-500"
              >
                View Graph
              </button>
            </div>
            <div className="w-full flex p-2 gap-2">
              <button
                onClick={() => setModalMode({ type: "edit", monitor: m })}
                className="p-2 w-1/2 border-2 border-yellow-400 rounded-md text-sm text-yellow-400  hover:bg-yellow-400 hover:text-white hover:scale-105 transition-all duration-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(m.id)}
                className="p-2 w-1/2 border-2 border-red-500 rounded-md text-sm text-red-500 hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {graphMonitorId && (
        <GraphModal data={graphData} onClose={() => setGraphMonitorId(null)} />
      )}
    </div>
  );
}
