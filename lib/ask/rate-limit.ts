const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

const requests = new Map<string, number[]>();

/**
 * One home or phone is handed a whole block of IPv6 addresses and can hop
 * between them at will, so the block is the visitor: its first four groups.
 */
function toVisitor(address: string) {
  return address.includes(":")
    ? address.split(":").slice(0, 4).join(":")
    : address;
}

/**
 * Counts a request against a per-instance sliding window. It slows down one
 * visitor hammering a warm function; it doesn't hold across instances, so it's
 * a seatbelt and not a firewall. Returns 0 when the request was counted and
 * can go, or how many seconds to wait when it's over the limit.
 */
export function recordRequest(address: string, now = Date.now()) {
  const key = toVisitor(address);

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
