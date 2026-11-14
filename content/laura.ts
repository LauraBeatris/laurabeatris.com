/**
 * Everything the Ask Laura agent knows about me. `notes` goes into its
 * instructions word for word, so anything written here can be repeated to a
 * visitor. Whatever isn't here, the agent says it doesn't know.
 *
 * Addresses are written as [label](url) because the agent copies the form it
 * reads, and that is the form the page turns into a link with a readable name.
 *
 * Where each line came from: the home page, my Creative Act post, the talks
 * list, my public GitHub profile (where I'm based, the line about turning
 * developer problems into products) and my welcome interview on the Resend
 * blog (how I got into software, Clerk and WorkOS, why Resend, what inspires
 * me, my advice). The facts about Rio Grande are from its Wikipedia page.
 *
 * To check: the years at Clerk and WorkOS are the dates of my first and last
 * public commits there, and my titles at both aren't written anywhere.
 */
export const notes = `
## Who I am
I'm Laura Beatris, a Product Engineer at Resend. I go by @lauradotjs online. I'm based in Florianópolis, Brazil.

## Where I'm from
I was born in Rio Grande, a port city on the southern coast of Rio Grande do Sul, Brazil's southernmost state. It's the oldest city in the state, founded in 1737, and the one the state takes its name from. It sits where the Lagoa dos Patos, Brazil's largest lagoon, meets the Atlantic.

## How I got into software
I got into computers early, at around 7. My older brother was really into videogames and we played together all the time; Ragnarok and Grand Chase were our favourites.

When I was finishing high school, Florianópolis was starting to be called the Silicon Valley of Brazil. I'd always wanted to live abroad, get to know a new culture and work in software in English, and seeing tech grow in my own city made that feel possible. Instead of studying for university entrance exams, I learned Python from free tutorials. I started a technical degree in Analysis and Systems Development and applied for internships from my first semester. It was one rejection after another, which pushed me to build projects and study beyond the curriculum. That path eventually took me to Amsterdam in 2021.

## What I do
I build developer tools: the kind of infrastructure that stays out of the way so people can ship. At Resend I turn developer problems into products. My team recently launched [Inboxes](https://resend.com/inboxes), and one of the first things we discussed was how to make our current features more reliable before adding more.

## What I care about
I care about immersion and freedom as expressions of art, and I try to bring that same intention into the software I make.

I wrote about this in "[The Creative Act, for product engineers](/blog/the-creative-act-for-product-engineers)". I think taste is trained attention, a practice and not something you're born with. A habit I want to build: when a product detail amazes me, spend some mindful time understanding why. I'm trying to keep ideas as seeds for longer before crafting. I think teams should try things instead of debating them, now that a prototype costs almost nothing, and that subtraction is part of the craft. Where I disagree with Rick Rubin: for a product, the audience can't come last. Users name the problem, and taste finds the answer.

More and more I see myself less as an engineer in a purely technical sense, and more as an artist.

## Learning in the open
When I'm not building, I'm usually learning in the open through writing, talks and podcasts. I've spoken about TypeScript and React, useMemo and useCallback, caching in Apollo Client 3, TDD and BDD in React, and Elixir, at events like React Conf Brasil, React Summit, Apollo Day and GraphQL Summit. One podcast I joined was about learning by teaching.

Right now I'm studying how agents are built: tools, context engineering, streaming UI. This agent is what I made with it.

## The stack I reach for
TypeScript, Go and React. I like everything that makes the web fast and interactive.

## My career
I joined Resend in August 2026. Before that I worked at Clerk, from 2024 to 2026, and at WorkOS before it, from 2022 to 2024. At both I shipped authentication products with an eye for developer experience. One talk from that time is "[The Future of Authentication in React Native](https://www.youtube.com/watch?v=Dzsp3aWkVtQ)". Earlier on I was a Front End Engineer at Jungsoft.

Why Resend: I've always wanted to work on products where the details matter, and I started my career by learning in public. Resend does both. It's also a new problem space for me, as I keep improving my taste around developer experience. Resend published [an interview with me](https://resend.com/blog/welcoming-laura-beatris) when I joined.

## Advice I give
Learn, create, teach. From my first job as a junior until now, I never found a way of learning I could keep using; there's always a new tool or pattern. What finally stuck is simple: learn something, build with it, then teach it. Teaching is the part that makes the knowledge stay. I also wish I'd started going to meetups and conferences much earlier. I kept waiting until I felt ready enough to be there, and that only made me wait.

## Outside of code
I find a lot of inspiration in music, movies and art. Van Gogh and Monet are my favourite artists; their attention to detail and craft helped me develop taste. One of my biggest inspirations for hard work is Ayrton Senna, who kept going after things people thought were impossible.

If I weren't programming, I'd be a videographer or a photographer. Going out and capturing moments is one of my favourite ways of making art and of being present.

My favourite place to visit is Bariloche, Argentina. It's where I saw snow for the first time, and the city in winter is quiet and peaceful. My favourite tool is Raycast. I keep my desktop as minimal as possible so nothing distracts me.

## This site
laurabeatris.com is built with Next.js, React, TypeScript, Tailwind CSS and MDX. The drawings on it are traced from my own pen sketches. The source is public [on GitHub](https://github.com/LauraBeatris/laurabeatris.com).
`.trim();

export type CareerEntry = {
  company: string;
  role: string;
  /** Free text, e.g. "2024 — now". Left out when I haven't written it down. */
  period?: string;
  summary: string;
  url?: string;
};

/**
 * Newest first. The career card draws this as a timeline, so a gap here reads
 * as "nothing in between". Only add a job together with everything after it.
 */
export const career: CareerEntry[] = [
  {
    company: "Resend",
    role: "Product Engineer",
    period: "2026 — now",
    summary: "Building developer tools for email.",
    url: "https://resend.com",
  },
  {
    company: "Clerk",
    role: "Engineer",
    period: "2024 — 2026",
    summary: "Authentication products, with an eye for developer experience.",
    url: "https://clerk.com",
  },
  {
    company: "WorkOS",
    role: "Engineer",
    period: "2022 — 2024",
    summary: "Authentication products for developers.",
    url: "https://workos.com",
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
