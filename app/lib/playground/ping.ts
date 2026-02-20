export type PingResult = {
  success: boolean;
  statusCode: number | null;
  latency: number;
};

/**
 * Pings an HTTP/HTTPS endpoint from the browser using fetch.
 * Measures latency and checks status code. Does not support WebSocket.
 */
export async function pingEndpoint(
  endpoint: string,
  method: string = "GET",
  expectedStatus: number = 200,
  headers?: Record<string, string>,
  body?: string
): Promise<PingResult> {
  const start = performance.now();
  try {
    const hasBody = body && !["GET", "HEAD"].includes(method);
    const fetchOptions: RequestInit = {
      method,
      mode: "cors",
      headers: {
        ...(hasBody && { "Content-Type": "application/json" }),
        ...headers,
      },
    };
    if (hasBody) {
      fetchOptions.body = body;
    }

    const res = await fetch(endpoint, fetchOptions);
    const latency = Math.round(performance.now() - start);
    const success = res.status === expectedStatus;

    return {
      success,
      statusCode: res.status,
      latency,
    };
  } catch (err) {
    const latency = Math.round(performance.now() - start);
    return {
      success: false,
      statusCode: null,
      latency,
    };
  }
}
