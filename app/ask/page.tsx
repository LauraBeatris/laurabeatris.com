import type { Metadata } from "next";
import { AskLaura } from "@/components/ask/ask-laura";
import { BackHeader } from "@/components/back-header";

export const metadata: Metadata = {
  title: "Ask Laura — Laura Beatris",
  description:
    "Ask an AI agent about Laura Beatris: her work at Resend, her talks, her writing, and how she thinks about building software.",
};

export default function AskPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[640px] flex-col px-6">
      <BackHeader href="/" label="@lauradotjs" />
      <AskLaura />
    </div>
  );
}
