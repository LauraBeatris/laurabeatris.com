import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { OG_SIZE } from "@/lib/og-card";
import { THEME_COLOR } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laurabeatris.com"),
  title: "Laura Beatris — Product Engineer",
  description:
    "Laura Beatris, a Product Engineer at Resend building developer tools.",
  openGraph: {
    title: "Laura Beatris — Product Engineer",
    description:
      "Product Engineer at Resend building developer tools.",
    url: "https://laurabeatris.com",
    siteName: "Laura Beatris",
    type: "website",
    // Written by scripts/og-video.ts: the card, with the signature writing itself
    videos: [
      {
        url: "https://laurabeatris.com/og/site.mp4",
        type: "video/mp4",
        width: OG_SIZE.width,
        height: OG_SIZE.height,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laura Beatris — Product Engineer",
    description:
      "Product Engineer at Resend building developer tools.",
    creator: "@lauradotjs",
  },
};

export const viewport: Viewport = {
  // Paints under the notch and home indicator. Whatever is pinned to an edge pads
  // itself back out with env(safe-area-inset-*)
  viewportFit: "cover",
  // Android's keyboard shrinks the layout, the way iOS already behaves
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
  ],
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
