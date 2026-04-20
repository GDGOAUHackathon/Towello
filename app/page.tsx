import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartColumn,
  Flame,
  Gauge,
  Gem,
  KeyRound,
  LineChart,
  Percent,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "outline";
};

type CardProps = ComponentPropsWithoutRef<"div">;

type BadgeProps = ComponentPropsWithoutRef<"span">;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C040] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-[#0A0A0A]",
        variant === "primary" &&
          "border border-[#F0C040]/70 bg-[#F0C040] text-zinc-950 shadow-[0_16px_36px_-20px_rgba(240,192,64,0.95)] hover:-translate-y-0.5 hover:brightness-110",
        variant === "outline" &&
          "border border-zinc-300 bg-white/80 text-zinc-700 hover:border-[#F0C040]/70 hover:text-[#B38914] dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200 dark:hover:text-[#F0C040]",
        className,
      )}
      {...props}
    />
  );
}

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white/90 p-6 shadow-[0_14px_35px_-24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 dark:border-zinc-800 dark:bg-[#1A1A1A]/90 dark:shadow-[0_14px_35px_-24px_rgba(0,0,0,0.95)]",
        className,
      )}
      {...props}
    />
  );
}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#F0C040]/45 bg-[#F0C040]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[#F0C040]",
        className,
      )}
      {...props}
    />
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-semibold leading-tight text-zinc-900 md:text-4xl dark:text-zinc-100">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base text-zinc-600 md:text-lg dark:text-zinc-400">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="group border-zinc-200 hover:-translate-y-1 hover:border-[#F0C040]/60 hover:shadow-[0_24px_48px_-34px_rgba(240,192,64,1)] dark:border-zinc-800/95">
      <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl border border-[#F0C040]/55 bg-[#F0C040]/10 text-[#F0C040]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </Card>
  );
}

function Step({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card className="h-full border-zinc-200 p-5 hover:border-[#F0C040]/55 dark:border-zinc-800/90">
      <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg border border-[#F0C040]/50 bg-[#F0C040]/10 text-[#F0C040]">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{body}</p>
    </Card>
  );
}

const features = [
  {
    icon: <ChartColumn className="size-5" />,
    title: "Real-Time Tracking",
    description:
      "Monitor live market positions, fills, and exposure across all active contracts.",
  },
  {
    icon: <Flame className="size-5" />,
    title: "P&L Breakdown",
    description:
      "Understand unrealized and realized returns with clear breakdowns by market.",
  },
  {
    icon: <Bot className="size-5" />,
    title: "AI-Powered Insights",
    description:
      "Gemini AI analyzes your portfolio behavior and surfaces meaningful signals.",
  },
  {
    icon: <Gauge className="size-5" />,
    title: "Instant Performance Metrics",
    description:
      "Get fast metrics on risk, win-rate, concentration, and opportunity score.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-zinc-50 text-zinc-900 transition-colors duration-500 dark:bg-[#0A0A0A] dark:text-zinc-100">
      <Navbar />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-56 left-1/2 h-136 w-136 -translate-x-1/2 rounded-full bg-[#F0C040]/14 blur-3xl dark:bg-[#F0C040]/16" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(39,39,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(39,39,42,0.07)_1px,transparent_1px)] bg-size-[48px_48px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
        <div className="absolute bottom-0 left-[-9%] h-80 w-80 rounded-full bg-zinc-300/30 blur-3xl dark:bg-zinc-700/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-30 md:px-8 md:pt-36">
        <section
          id="home"
          className="grid items-center gap-12 pb-24 lg:grid-cols-2"
        >
          <div className="animate-[fade-in_0.7s_ease-out]">
            <Badge>Premium Fintech Experience</Badge>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl">
              Turn Your Portfolio Into Intelligence
            </h1>
            <p className="mt-6 max-w-xl text-base text-zinc-600 md:text-lg dark:text-zinc-400">
              Track your positions, analyze performance, and get AI-powered
              insights instantly.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button className="group gap-2">
                Get Started
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
              <Button variant="outline">See Demo</Button>
            </div>
            <div className="mt-8 flex items-center gap-7 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#F0C040]" />
                Secure by design
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#F0C040]" />
                Insights in seconds
              </div>
            </div>
          </div>

          <Card className="animate-[slide-in_0.8s_ease-out] border-zinc-200 p-4 dark:border-zinc-800">
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-white/80 p-4 dark:bg-zinc-900/80">
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Value
                </p>
                <p className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  $241,820
                </p>
              </Card>
              <Card className="bg-white/80 p-4 dark:bg-zinc-900/80">
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Return
                </p>
                <p className="mt-2 text-xl font-semibold text-emerald-400">
                  +8.4%
                </p>
              </Card>
              <Card className="bg-white/80 p-4 dark:bg-zinc-900/80">
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Win Rate
                </p>
                <p className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  72.4%
                </p>
              </Card>
            </div>
            <Card className="mt-4 bg-white/80 p-4 dark:bg-zinc-900/80">
              <div className="mb-3 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                <span>Portfolio Performance</span>
                <LineChart className="size-4 text-[#F0C040]" />
              </div>
              <div className="h-32 rounded-xl bg-[linear-gradient(120deg,rgba(240,192,64,0.28),rgba(240,192,64,0.12)_40%,rgba(24,24,27,0.06))] dark:bg-[linear-gradient(120deg,rgba(240,192,64,0.35),rgba(240,192,64,0.08)_40%,rgba(255,255,255,0.03))]" />
            </Card> 
            <Card className="mt-4 bg-white/80 p-4 dark:bg-zinc-900/80">
              <div className="mb-3 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                <span>Top Exposure</span>
                <span>Weight</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 dark:bg-zinc-800/70">
                  <span className="text-zinc-700 dark:text-zinc-300">
                    US Election Winner
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    18.2%
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 dark:bg-zinc-800/70">
                  <span className="text-zinc-700 dark:text-zinc-300">
                    Fed Rate Cut Q3
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    14.7%
                  </span>
                </div>
              </div>
            </Card>
          </Card>
        </section>

        <section id="features" className="pb-24">
          <SectionTitle
            title="Designed for serious prediction market traders"
            subtitle="Clean, fast, and built to help you act with confidence."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        <section id="ai-analysis" className="pb-24">
          <SectionTitle
            title="Not Just Data - Intelligent Insight"
            subtitle="AI context that explains what your numbers actually mean."
          />
          <Card className="mx-auto mt-10 max-w-4xl border-[#F0C040]/55 bg-white/90 p-6 shadow-[0_0_0_1px_rgba(240,192,64,0.3),0_26px_60px_-34px_rgba(240,192,64,0.9)] dark:bg-[#1A1A1A]">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              <BrainCircuit className="size-4 text-[#F0C040]" />
              AI Analyst Output
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                Insight Summary
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  You are heavily concentrated in sports markets (62%). Consider
                  diversifying to reduce volatility.
                </li>
                <li>
                  Political event positions have the highest downside
                  correlation this week.
                </li>
                <li>
                  Rebalancing 8-10% into macro contracts improves risk-adjusted
                  return profile.
                </li>
              </ul>
              <p className="mt-4 text-emerald-400">Confidence: 93%</p>
            </div>
          </Card>
        </section>

        <section className="grid items-center gap-10 pb-24 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Badge className="mb-4">Dashboard Preview</Badge>
            <h3 className="text-3xl font-semibold text-zinc-900 md:text-4xl dark:text-zinc-100">
              Everything you need to understand your portfolio - at a glance.
            </h3>
            <p className="mt-5 max-w-lg text-zinc-600 dark:text-zinc-400">
              From high-level KPIs to position-level detail, Bayse gives you a
              focused command center for faster decisions.
            </p>
          </div>
          <Card className="border-zinc-200 p-4 dark:border-zinc-800">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="bg-white/80 p-4 dark:bg-zinc-900/85">
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Portfolio
                </p>
                <p className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  $241,820
                </p>
              </Card>
              <Card className="bg-white/80 p-4 dark:bg-zinc-900/85">
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Exposure
                </p>
                <p className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  67.3%
                </p>
              </Card>
              <Card className="bg-white/80 p-4 dark:bg-zinc-900/85">
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Opportunity
                </p>
                <p className="mt-2 text-xl font-semibold text-[#F0C040]">
                  High
                </p>
              </Card>
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
              <Card className="bg-white/80 p-4 dark:bg-zinc-900/85">
                <div className="mb-3 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                  <span>Projected P&L Curve</span>
                  <Percent className="size-4 text-[#F0C040]" />
                </div>
                <div className="h-40 rounded-xl bg-[radial-gradient(circle_at_top_left,rgba(240,192,64,0.28),transparent_45%),linear-gradient(130deg,rgba(24,24,27,0.08),rgba(24,24,27,0.03))] dark:bg-[radial-gradient(circle_at_top_left,rgba(240,192,64,0.28),transparent_45%),linear-gradient(130deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
              </Card>
              <Card className="bg-white/80 p-4 dark:bg-zinc-900/85">
                <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                  Open Markets
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 dark:bg-zinc-800/70">
                    <span className="text-zinc-700 dark:text-zinc-300">
                      Politics
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      21
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 dark:bg-zinc-800/70">
                    <span className="text-zinc-700 dark:text-zinc-300">
                      Macro
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      34
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 dark:bg-zinc-800/70">
                    <span className="text-zinc-700 dark:text-zinc-300">
                      Sports
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      17
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </section>

        <section id="how-it-works" className="pb-24">
          <SectionTitle
            title="How It Works"
            subtitle="From setup to insight in three steps."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Step
              icon={<KeyRound className="size-5" />}
              title="Connect your Bayse API key"
              body="Securely connect your account and sync your real positions."
            />
            <Step
              icon={<Wallet className="size-5" />}
              title="View your portfolio instantly"
              body="See updated exposure, P&L, and market-level metrics immediately."
            />
            <Step
              icon={<Sparkles className="size-5" />}
              title="Get AI-powered analysis"
              body="Receive clear actions and risk signals tailored to your activity."
            />
          </div>
        </section>

        <section className="pb-24">
          <SectionTitle
            title="Why This Matters"
            subtitle="Prediction market data is growing fast, but most traders still operate without intelligent guidance."
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            <Card className="border-zinc-200 p-5 dark:border-zinc-800/90">
              <Gem className="size-5 text-[#F0C040]" />
              <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
                Prediction markets are scaling rapidly across global events.
              </p>
            </Card>
            <Card className="border-zinc-200 p-5 dark:border-zinc-800/90">
              <ChartColumn className="size-5 text-[#F0C040]" />
              <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
                Most traders lack intelligent insight into concentration and
                risk.
              </p>
            </Card>
            <Card className="border-zinc-200 p-5 dark:border-zinc-800/90">
              <Bot className="size-5 text-[#F0C040]" />
              <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
                Bayse adds an AI layer to improve decision quality and execution
                speed.
              </p>
            </Card>
          </div>
        </section>

        <section className="pb-10">
          <Card className="border-[#F0C040]/45 bg-zinc-900 p-10 text-center shadow-[0_24px_65px_-36px_rgba(240,192,64,0.95)] dark:bg-zinc-950">
            <h3 className="text-3xl font-semibold text-zinc-100 md:text-4xl">
              Start analyzing your portfolio today
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              The fastest way to turn market data into strategic action.
            </p>
            <div className="mt-8">
              <Button className="px-8 py-3.5 text-base">Connect Now</Button>
            </div>
          </Card>
        </section>

        <footer className="border-t border-zinc-200 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <div className="flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
            <p>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Bayse Portfolio Tracker
              </span>{" "}
              • GDG Hackathon 2026
            </p>
            <div className="flex items-center gap-4">
              <Link
                className="hover:text-[#B38914] dark:hover:text-[#F0C040]"
                href="#"
              >
                GitHub
              </Link>
              <Link
                className="hover:text-[#B38914] dark:hover:text-[#F0C040]"
                href="#"
              >
                Docs
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
