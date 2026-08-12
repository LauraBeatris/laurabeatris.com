import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    "Laura Beatris, a Product Engineer at Resend. Following the flow of learning, creating, and teaching — with immersion and freedom as expressions of art.",
  openGraph: {
    title: "Laura Beatris — Product Engineer",
    description:
      "Product Engineer at Resend. Following the flow of learning, creating, and teaching.",
    url: "https://laurabeatris.com",
    siteName: "Laura Beatris",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laura Beatris — Product Engineer",
    description:
      "Product Engineer at Resend. Following the flow of learning, creating, and teaching.",
    creator: "@lauradotjs",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
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
