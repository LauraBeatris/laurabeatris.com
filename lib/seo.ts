import type { Metadata } from "next";
import { socials } from "@/content/laura";
import { OG_SIZE } from "@/lib/og-card";
import { SITE_URL } from "@/lib/site";

export const SITE_NAME = "Laura Beatris";
export const TWITTER_HANDLE = "@lauradotjs";
export const FEED_PATH = "/feed.xml";

/** The still site card, from app/opengraph-image.tsx. */
const SITE_CARD_IMAGE = {
  url: "/opengraph-image",
  width: OG_SIZE.width,
  height: OG_SIZE.height,
  alt: SITE_NAME,
  type: "image/png",
};

/**
 * A page's title, description, canonical link and share card in one place.
 *
 * Next replaces a parent's `openGraph` and `alternates` wholesale rather than
 * merging them, so every page sets its own. Without this, /blog and /talks
 * shared as the home page, and a page reached on a *.vercel.app address had
 * nothing telling search engines which address is the real one.
 */
export function pageMetadata({
  title,
  description,
  path,
  card = "site",
  openGraph,
}: {
  title: string;
  description: string;
  /** The page's path on the site, e.g. "/blog". */
  path: string;
  /**
   * Which share card to attach: "site", or a post's slug. A post's still image
   * comes from its own opengraph-image route; every other page has to name the
   * site's, since setting `openGraph` here stops it being inherited.
   */
  card?: string;
  openGraph?: Metadata["openGraph"];
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": [{ url: FEED_PATH, title: `${SITE_NAME} — Blog` }] },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      ...(card === "site" && { images: [SITE_CARD_IMAGE] }),
      // Written by scripts/og-video.ts: the card, with the signature writing
      // itself. Absolute, since Next doesn't resolve video URLs like images.
      videos: [
        {
          url: `${SITE_URL}/og/${card}.mp4`,
          type: "video/mp4",
          width: OG_SIZE.width,
          height: OG_SIZE.height,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: TWITTER_HANDLE,
      ...(card === "site" && { images: [SITE_CARD_IMAGE] }),
    },
  };
}

/** Who the site is about, for search engines' knowledge panels. */
export const personJsonLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Product Engineer",
  worksFor: { "@type": "Organization", name: "Resend", url: "https://resend.com" },
  sameAs: socials.map((social) => social.url),
};

/** A `<script type="application/ld+json">` body, with `<` escaped so no string can close the tag. */
export function jsonLdScript(data: Record<string, unknown>) {
  return JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c");
}

export const HOME_TITLE = `${SITE_NAME} — Product Engineer`;
export const HOME_DESCRIPTION =
  "Laura Beatris, a Product Engineer at Resend building developer tools.";
