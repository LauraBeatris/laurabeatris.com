import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laura Beatris",
  description:
    "Laura Beatris, an engineer with immersion and freedom as expressions of art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
