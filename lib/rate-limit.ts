/**
 * A per-instance sliding window. It slows down one visitor hammering a warm
 * function; it doesn't hold across instances, so it's a seatbelt and not a
 * firewall.
 */
export function createRateLimit({
  windowMs,
  maxRequests,
}: {
  windowMs: number;
  maxRequests: number;
}) {
  const requests = new Map<string, number[]>();

  /**
   * Returns 0 when the request was counted and can go, or how many seconds to
   * wait when the key is over the limit.
   */
  return function recordRequest(key: string, now = Date.now()) {
    const recent = (requests.get(key) ?? []).filter(
      (time) => now - time < windowMs,
    );

    if (recent.length >= maxRequests) {
      requests.set(key, recent);
      return Math.ceil((recent[0] + windowMs - now) / 1000);
    }

    recent.push(now);
    requests.set(key, recent);

    // Keep the map from growing with every address that ever wrote
    if (requests.size > 5000) {
      for (const [address, times] of requests) {
        if (now - times[times.length - 1] >= windowMs) requests.delete(address);
      }
    }

    return 0;
  };
}
