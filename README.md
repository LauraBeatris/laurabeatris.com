<h1>
  <a href="https://laurabeatris.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/readme-header-dark.svg">
      <img src=".github/assets/readme-header-light.svg" alt="laurabeatris.com">
    </picture>
  </a>
</h1>

My personal portfolio, built with Next.js, React, and Tailwind CSS.

## Running locally

```bash
pnpm install
pnpm dev
```

Talks and podcasts live in `content/talks.ts`.

## Ask Laura

`/ask` is an agent that answers questions about me. What it knows lives in `content/laura.ts`, and the agent and its tools are in `lib/ask/agent.ts`.

It calls the model through the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway). On Vercel the deployment authenticates by itself. Locally, put a key in `.env.local`:

```bash
AI_GATEWAY_API_KEY=...
```
