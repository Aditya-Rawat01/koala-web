export type PlaygroundMonitor = {
  id: string;
  endpoint: string;
  method: string;
  expected_status: number;
  interval: number;
  headers?: Record<string, string>;
  body?: string;
  created_at: string;
  // runtime fields (updated by ping)
  success?: boolean;
  statusCode?: number | null;
  latency?: number;
};

export type GraphPoint = {
  timestamp: number;
  latency: number;
  success: boolean;
};

const STORAGE_KEY = "koala-playground-monitors";

export function loadMonitorsFromStorage(): PlaygroundMonitor[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMonitorsToStorage(monitors: PlaygroundMonitor[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(monitors));
  } catch (e) {
    console.warn("Failed to save monitors to localStorage", e);
  }
}

export function generateId(): string {
  return `pm_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
