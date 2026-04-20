import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

function GridPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      aria-hidden
    >
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
}

function GlowOrbs() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="landing-hero-glow absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="landing-hero-glow absolute -right-1/4 top-1/3 h-[480px] w-[480px] rounded-full bg-violet-600/20 blur-[110px] [animation-delay:-4s]" />
      <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-amber-500/10 blur-[100px]" />
    </div>
  );
}

function IconBolt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 19V5M4 19h16M8 17V11M12 17V8M16 17v-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSpark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 3l1.2 3.6L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3zM5 19l.8-2.4L8 16l-2.2.7L5 19z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 21s8-4 8-10V5l-8-3-8 3v6c0 6 8 10 8 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MockDashboardCard() {
  return (
    <div className="landing-card-float relative mx-auto w-full max-w-md">
      <div className="landing-shimmer-border absolute -inset-px rounded-2xl opacity-80" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Portfolio value
            </p>
            <p className="mt-1 font-mono text-3xl font-semibold tracking-tight text-white">
              $24,180.42
            </p>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
            +7.6%
          </span>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Positions', value: '12' },
            { label: 'PnL (30d)', value: '+$31' },
            { label: 'AI brief', value: 'Ready' },
          ].map((row) => (
            <div
              key={row.label}
              className="rounded-xl border border-white/5 bg-white/[0.03] px-2 py-3"
            >
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">
                {row.label}
              </p>
              <p className="mt-1 font-mono text-sm font-medium text-zinc-200">
                {row.value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 h-16 rounded-xl bg-gradient-to-t from-emerald-500/10 to-transparent">
          <div className="flex h-full items-end gap-1 px-3 pb-2">
            {[40, 65, 45, 80, 55, 90, 70, 95, 75, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/60 to-emerald-400/20"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] text-zinc-600">
          Illustrative UI — your live Bayse data appears in the app.
        </p>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-zinc-100 selection:bg-emerald-500/25 selection:text-emerald-50">
      <GridPattern />
      <GlowOrbs />

      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 opacity-0 shadow-lg transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#030712]"
      >
        Skip to content
      </a>

      <header className="relative z-10 border-b border-white/[0.06] bg-[#030712]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20">
              T
            </span>
            <span className="text-lg font-semibold tracking-tight">Towello</span>
          </Link>
          <nav
            className="hidden items-center gap-8 text-sm text-zinc-400 md:flex"
            aria-label="Primary"
          >
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#stack" className="transition hover:text-white">
              Stack
            </a>
            <a href="#flow" className="transition hover:text-white">
              Flow
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.LOGIN}
              className="hidden text-sm text-zinc-400 transition hover:text-white sm:inline"
            >
              Sign in
            </Link>
            <Link
              href={ROUTES.DASHBOARD}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Open app
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="relative z-10 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pb-28">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Hackathon build · Firebase · Bayse · Gemini
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
                Your prediction-market{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-white to-violet-300 bg-clip-text text-transparent">
                  command center
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">
                Track live positions on Bayse, understand realized PnL at a glance,
                and turn portfolio noise into a clear AI briefing — built to demo
                fast and judge well.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={ROUTES.DASHBOARD}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-7 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition hover:brightness-110"
                >
                  Launch dashboard
                </Link>
                <a
                  href="#features"
                  className="text-sm font-medium text-zinc-400 underline-offset-4 transition hover:text-white hover:underline"
                >
                  See what ships
                </a>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-500">
                <li className="flex items-center gap-2">
                  <IconBolt className="h-4 w-4 text-emerald-400" />
                  Live API routes
                </li>
                <li className="flex items-center gap-2">
                  <IconShield className="h-4 w-4 text-violet-400" />
                  Keys stay on the server
                </li>
                <li className="flex items-center gap-2">
                  <IconSpark className="h-4 w-4 text-amber-400" />
                  Gemini JSON analysis
                </li>
              </ul>
            </div>
            <div className="relative lg:pl-4">
              <MockDashboardCard />
            </div>
          </div>
        </section>

        <section
          id="stack"
          className="relative z-10 border-y border-white/[0.06] bg-white/[0.02] py-10"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-4 sm:flex-row sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Powered by
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-zinc-300">
              <span className="rounded-lg border border-white/10 bg-zinc-900/50 px-4 py-2">
                Bayse Markets API
              </span>
              <span className="rounded-lg border border-white/10 bg-zinc-900/50 px-4 py-2">
                Firebase Auth · Firestore
              </span>
              <span className="rounded-lg border border-white/10 bg-zinc-900/50 px-4 py-2">
                Google Gemini
              </span>
              <span className="rounded-lg border border-white/10 bg-zinc-900/50 px-4 py-2">
                Next.js 16
              </span>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="relative z-10 px-4 py-20 sm:px-6 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Built to stand out on demo day
              </h2>
              <p className="mt-3 text-lg text-zinc-400">
                A bento-style layout mirrors how modern product sites win
                attention — clear modules, depth, and zero filler.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
              <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/90 to-zinc-950 p-6 md:col-span-4 md:row-span-2">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl transition group-hover:bg-emerald-500/20" />
                <IconChart className="h-8 w-8 text-emerald-400" />
                <h3 className="mt-4 text-xl font-semibold">Portfolio clarity</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                  Positions, notionals, and market context — pulled from Bayse and
                  shaped for quick scanning in the dashboard and positions table.
                </p>
                <div className="mt-6 rounded-xl border border-white/5 bg-black/30 p-4 font-mono text-xs text-zinc-500">
                  <p className="text-emerald-400/90">GET /api/portfolio</p>
                  <p className="mt-1 text-zinc-500">
                    → positions[] · summary.totalValue
                  </p>
                </div>
              </article>

              <article className="rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-6 md:col-span-2">
                <IconBolt className="h-7 w-7 text-amber-400" />
                <h3 className="mt-3 text-lg font-semibold">Realized PnL</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Time-window controls map to Bayse PnL periods — plus optional
                  event breakdown when the API returns it.
                </p>
              </article>

              <article className="rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-6 md:col-span-2">
                <IconSpark className="h-7 w-7 text-violet-400" />
                <h3 className="mt-3 text-lg font-semibold">AI briefing</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Gemini turns your live portfolio JSON into structured insights —
                  summary, bullets, risk band, and outlook.
                </p>
              </article>

              <article className="rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-6 md:col-span-3">
                <IconShield className="h-7 w-7 text-zinc-300" />
                <h3 className="mt-3 text-lg font-semibold">Server-first</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  No secrets in the browser — Bayse and Gemini keys stay in
                  environment variables on the server, aligned with how you pitch
                  security to judges.
                </p>
              </article>

              <article className="flex flex-col justify-between rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-6 md:col-span-3">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-100">
                    Judging tip
                  </h3>
                  <p className="mt-2 text-sm text-emerald-200/80">
                    Walk the flow: landing → dashboard → positions → PnL → analysis.
                    Show the network tab once to prove real API responses.
                  </p>
                </div>
                <Link
                  href={ROUTES.ANALYSIS}
                  className="mt-4 inline-flex w-fit items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  Open AI analysis →
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section
          id="flow"
          className="relative z-10 border-t border-white/[0.06] bg-gradient-to-b from-transparent to-zinc-950/80 px-4 py-20 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">
              Three beats for your pitch
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Connect',
                  body: 'Add your Bayse public key to the server env — your portfolio loads instantly.',
                },
                {
                  step: '02',
                  title: 'Monitor',
                  body: 'Dashboard and PnL views reflect live API data — no mock JSON in the hot path.',
                },
                {
                  step: '03',
                  title: 'Interpret',
                  body: 'One click runs Gemini for a structured narrative judges can follow.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-white/[0.06] bg-zinc-900/30 p-6"
                >
                  <span className="font-mono text-xs text-zinc-500">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-emerald-950/40 p-10 text-center shadow-2xl shadow-black/50">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Ready when the timer starts
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-zinc-400">
              Ship the demo, show the graph, tell the story — Towello is the shell
              around real market data and real AI.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={ROUTES.DASHBOARD}
                className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                Enter app
              </Link>
              <Link
                href={ROUTES.POSITIONS}
                className="inline-flex rounded-full border border-white/15 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                View positions
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs font-bold">
              T
            </span>
            <span className="text-sm font-medium text-zinc-400">
              Towello — hackathon build
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <Link href={ROUTES.DASHBOARD} className="hover:text-white">
              Dashboard
            </Link>
            <Link href={ROUTES.PNL} className="hover:text-white">
              PnL
            </Link>
            <Link href={ROUTES.ANALYSIS} className="hover:text-white">
              Analysis
            </Link>
            <Link href={ROUTES.LOGIN} className="hover:text-white">
              Login
            </Link>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-zinc-600">
          Not affiliated with Bayse or Google. Demo software — verify live data
          before trading decisions.
        </p>
      </footer>
    </div>
  );
}
