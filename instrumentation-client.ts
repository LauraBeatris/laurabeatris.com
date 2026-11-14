import { initBotId } from "botid/client/core";

// The two routes that cost money per request. Their requests carry a proof
// that a real browser sent them, which each route checks before doing any work.
initBotId({
  protect: [
    { path: "/api/ask", method: "POST" },
    { path: "/api/contact", method: "POST" },
  ],
});
