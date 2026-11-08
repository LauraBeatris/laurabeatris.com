import { SiteFooter } from "@/components/site-footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[640px] flex-col px-6">
      {children}
      <SiteFooter />
    </div>
  );
}
