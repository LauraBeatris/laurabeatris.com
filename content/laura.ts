/**
 * Everything the Ask Laura agent knows about me. `notes` goes into its
 * instructions word for word, so anything written here can be repeated to a
 * visitor. Whatever isn't here, the agent says it doesn't know.
 *
 * Still to write, so the agent has an answer:
 * - where I was born and grew up
 * - my career before Resend, with dates (also fill `career` below)
 * - the stack I reach for, and why
 */
export const notes = `
## Who I am
I'm Laura Beatris, a Product Engineer at Resend. I go by @lauradotjs online. I'm based in Florianópolis, Brazil.

## What I do
I build developer tools: the kind of infrastructure that stays out of the way so people can ship. At Resend I turn developer problems into products. My team recently launched Inboxes (https://resend.com/inboxes), and one of the first things we discussed was how to make our current features more reliable before adding more.

## What I care about
I care about immersion and freedom as expressions of art, and I try to bring that same intention into the software I make.

I think taste is trained attention, not something you're born with. I use the products I admire slowly: when a flow feels good, I stop and work out why. I try to keep ideas as seeds for longer before crafting, to prototype instead of debating, and to treat subtraction as part of the craft. Where I disagree with Rick Rubin: for a product, the audience can't come last. Users name the problem, and taste finds the answer.

More and more I see myself less as an engineer in a purely technical sense, and more as an artist.

## Learning in the open
When I'm not building, I'm usually learning in the open through writing, talks and podcasts. I've spoken about TypeScript and React, useMemo and useCallback, caching in Apollo Client 3, TDD and BDD in React, and Elixir, at events like React Conf Brasil, React Summit, Apollo Day and GraphQL Summit. One podcast I joined was about learning by teaching.

Right now I'm studying how agents are built: tools, context engineering, streaming UI. This agent is what I made with it.

## Earlier in my career
I was a Front End Engineer at Jungsoft.

## This site
laurabeatris.com is built with Next.js, React, TypeScript, Tailwind CSS and MDX. The drawings on it are traced from my own pen sketches. The source is public at https://github.com/LauraBeatris/laurabeatris.com.
`.trim();

export type CareerEntry = {
  company: string;
  role: string;
  /** Free text, e.g. "2024 — now". Left out when I haven't written it down. */
  period?: string;
  summary: string;
  url?: string;
};

/** Newest first. */
export const career: CareerEntry[] = [
  {
    company: "Resend",
    role: "Product Engineer",
    period: "Now",
    summary: "Building developer tools for email.",
    url: "https://resend.com",
  },
  {
    company: "Jungsoft",
    role: "Front End Engineer",
    summary: "Front-end engineering.",
  },
];

export const socials = [
  { label: "X", handle: "@lauradotjs", url: "https://x.com/lauradotjs" },
  {
    label: "GitHub",
    handle: "LauraBeatris",
    url: "https://github.com/LauraBeatris",
  },
  {
    label: "LinkedIn",
    handle: "laurabeatris",
    url: "https://www.linkedin.com/in/laurabeatris",
  },
];
