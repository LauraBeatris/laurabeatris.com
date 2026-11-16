/** The one address the live site is meant to be reached on. */
const SITE_HOST = "laurabeatris.com";

/** Where every canonical link, sitemap entry and feed item points. */
export const SITE_URL = `https://${SITE_HOST}`;

/**
 * Every deployment is also reachable on generated *.vercel.app addresses, and
 * this repository's deployment history lists them publicly. The routes that
 * cost money answer on the real address only, so there is one front door to
 * rate-limit and watch. Previews and local development are left open here;
 * previews are kept private by the project's Deployment Protection.
 */
export function isOnSiteHost(request: Request) {
  if (process.env.VERCEL_ENV !== "production") return true;

  return new URL(request.url).host === SITE_HOST;
}
