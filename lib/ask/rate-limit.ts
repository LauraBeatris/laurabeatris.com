const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

const requests = new Map<string, number[]>();

/**
 * A per-instance sliding window. It slows down one visitor hammering a warm
 * function; it doesn't hold across instances, so it's a seatbelt and not a
 * firewall. Returns how many seconds to wait, or 0 when the request can go.
 */
export function secondsUntilAllowed(key: string, now = Date.now()) {
  const recent = (requests.get(key) ?? []).filter(
    (time) => now - time < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS) {
    requests.set(key, recent);
    return Math.ceil((recent[0] + WINDOW_MS - now) / 1000);
  }

  recent.push(now);
  requests.set(key, recent);

  // Keep the map from growing with every address that ever asked
  if (requests.size > 5000) {
    for (const [address, times] of requests) {
      if (now - times[times.length - 1] >= WINDOW_MS) requests.delete(address);
    }
  }

  return 0;
}
