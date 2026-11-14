import createMDX from "@next/mdx";
import { withBotId } from "botid/next/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Nothing on the site uses next/image. Left open, its optimizer is a public
  // endpoint anyone can call to have images resized at my expense, so no path
  // or host is allowed through it.
  images: { unoptimized: true, localPatterns: [], remotePatterns: [] },
  async headers() {
    return [
      {
        // Each file's name ends in a hash of its contents, so a browser that
        // has one never needs to ask for it again
        source: "/blog-videos/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX();

// BotID serves its browser check from this site's own address
export default withBotId(withMDX(nextConfig));
