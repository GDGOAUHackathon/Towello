import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartColumn,
  CheckCircle2,
  Database,
  Flame,
  Gem,
  Gauge,
  LineChart,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import Toggle from "@/components/toggle";

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
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        variant === "primary" &&
          "bg-[#F0C040] text-zinc-950 shadow-[0_0_0_1px_rgba(240,192,64,0.35),0_14px_38px_-20px_rgba(240,192,64,0.85)] hover:brightness-110 focus-visible:ring-[#F0C040]",
        variant === "outline" &&
          "border border-zinc-400/40 text-zinc-800 backdrop-blur-sm hover:border-[#F0C040]/70 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-[#F0C040] dark:hover:text-[#F0C040] focus-visible:ring-zinc-500",
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
        "rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-[0_8px_28px_-18px_rgba(24,24,27,0.3)] backdrop-blur-md transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900/55 dark:shadow-[0_10px_35px_-20px_rgba(0,0,0,0.9)]",
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
        "inline-flex items-center rounded-full border border-zinc-300/80 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300",
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
      <h2 className="text-3xl font-semibold leading-tight text-zinc-950 md:text-4xl dark:text-zinc-50">
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

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up" | "neutral";
}) {
  return (
    <Card className="p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p
        className={cn(
          "mt-3 text-2xl font-semibold",
          tone === "up"
            ? "text-emerald-500"
            : "text-zinc-900 dark:text-zinc-100",
        )}
      >
        {value}
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
    <Card className="group relative h-full border-zinc-300/70 hover:border-[#F0C040]/70 dark:border-zinc-800 dark:hover:border-[#F0C040]/60">
      <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl border border-[#F0C040]/60 bg-[#F0C040]/10 text-[#F0C040] shadow-[0_0_25px_-14px_rgba(240,192,64,0.95)]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{body}</p>
    </Card>
  );
}

const features = [
  {
    icon: <ChartColumn className="size-5" />,
    title: "Track",
    description:
      "Real-time portfolio tracking with live positions and P&L visibility.",
  },
  {
    icon: <Bot className="size-5" />,
    title: "AI Analysis",
    description:
      "Gemini AI highlights momentum shifts, exposure, and portfolio blind spots.",
  },
  {
    icon: <Gauge className="size-5" />,
    title: "Instant Insights",
    description:
      "See risk, performance, and opportunities in seconds with focused analytics.",
  },
];

const techStack = ["Next.js", "Firebase", "Gemini AI", "Bayse API"];

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-zinc-50 text-zinc-900 transition-colors duration-500 dark:bg-[#0A0A0A] dark:text-zinc-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-136 w-136 -translate-x-1/2 rounded-full bg-[#F0C040]/20 blur-3xl dark:bg-[#F0C040]/14" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(39,39,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(39,39,42,0.07)_1px,transparent_1px)] bg-size-[48px_48px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
        <div className="absolute bottom-0 left-[-10%] h-80 w-80 rounded-full bg-zinc-300/30 blur-3xl dark:bg-zinc-700/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-8">
        <header className="mb-16 flex items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#F0C040] text-zinc-950 shadow-[0_0_32px_-16px_rgba(240,192,64,1)]">
              <Gem className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] text-zinc-900 dark:text-zinc-100">
                BAYSE
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Portfolio Tracker + AI Analyst
              </p>
            </div>
          </div>
          <Toggle />
        </header>

        <section className="grid items-center gap-12 pb-20 md:gap-16 lg:grid-cols-2">
          <div className="animate-[fade-in_0.7s_ease-out]">
            <Badge className="border-[#F0C040]/60 bg-[#F0C040]/10 text-[#B38B18] dark:text-[#F0C040]">
              Hackathon Build • Premium Fintech UI
            </Badge>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl">
              Turn Your Portfolio Into Intelligence
            </h1>
            <p className="mt-6 max-w-xl text-base text-zinc-600 md:text-lg dark:text-zinc-300/90">
              Track, analyze, and get AI-powered insights on your prediction
              market positions in real-time.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button className="group gap-2">
                Get Started
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
              <Button variant="outline">View Demo</Button>
            </div>
            <div className="mt-8 flex items-center gap-8 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#F0C040]" />
                Secure analytics
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#F0C040]" />
                Real-time AI insights
              </div>
            </div>
          </div>

          <Card className="animate-[slide-in_0.8s_ease-out] border-zinc-300/80 p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)] dark:border-zinc-700/80 dark:bg-zinc-900/50">
            <div className="rounded-xl border border-zinc-200/90 bg-white/85 p-4 dark:border-zinc-800 dark:bg-zinc-950/85">
              <div className="mb-4 grid grid-cols-3 gap-3">
                <Metric label="Portfolio Value" value="$241,820" />
                <Metric label="24h Return" value="+4.28%" tone="up" />
                <Metric label="Win Rate" value="72.4%" />
              </div>
              <Card className="mb-3 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Performance Curve
                  </p>
                  <LineChart className="size-4 text-[#F0C040]" />
                </div>
                <div className="h-28 rounded-xl bg-[linear-gradient(120deg,rgba(240,192,64,0.36),rgba(240,192,64,0.05)_45%,rgba(24,24,27,0.06))] dark:bg-[linear-gradient(120deg,rgba(240,192,64,0.34),rgba(240,192,64,0.08)_45%,rgba(255,255,255,0.04))]" />
              </Card>
              <Card className="p-4">
                <div className="mb-3 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300">
                  <p>Top Positions</p>
                  <p>Exposure</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded-lg bg-zinc-100/70 px-3 py-2 dark:bg-zinc-900/80">
                    <span className="text-zinc-700 dark:text-zinc-200">
                      US Election Winner
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      18.2%
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-100/70 px-3 py-2 dark:bg-zinc-900/80">
                    <span className="text-zinc-700 dark:text-zinc-200">
                      Fed Rate Cut Q3
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      14.7%
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </section>

        <section className="pb-20">
          <Card className="flex flex-wrap items-center justify-between gap-5 border-zinc-300/70 px-6 py-5 dark:border-zinc-800/90">
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-zinc-300/80 bg-white/80 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900/70"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Powered by modern, scalable technologies
            </p>
          </Card>
        </section>

        <section className="pb-20">
          <SectionTitle
            title="Built for speed, clarity, and precision"
            subtitle="Everything is designed to remove noise and surface decisions that matter."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group border-zinc-300/70 hover:-translate-y-1 hover:border-[#F0C040]/70 hover:shadow-[0_20px_45px_-26px_rgba(240,192,64,0.9)] dark:border-zinc-800 dark:hover:border-[#F0C040]/60"
              >
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl border border-[#F0C040]/60 bg-[#F0C040]/10 text-[#F0C040]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid items-center gap-10 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge className="mb-4">Dashboard Preview</Badge>
            <h3 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50 md:text-4xl">
              Everything you need. Nothing you don’t.
            </h3>
            <p className="mt-5 max-w-lg text-zinc-600 dark:text-zinc-400">
              From high-level performance metrics to position-level drill-downs,
              Bayse gives you a trading cockpit that stays fast and focused.
            </p>
          </div>
          <Card className="border-zinc-300/70 p-4 dark:border-zinc-800">
            <div className="grid gap-4 sm:grid-cols-3">
              <Metric label="Portfolio Value" value="$241,820" />
              <Metric label="Return" value="+28.1%" tone="up" />
              <Metric label="Win Rate" value="72.4%" />
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
              <Card className="p-4">
                <div className="mb-3 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                  <span>Projected P&L</span>
                  <Flame className="size-4 text-[#F0C040]" />
                </div>
                <div className="h-40 rounded-xl bg-[radial-gradient(circle_at_top_left,rgba(240,192,64,0.32),transparent_50%),linear-gradient(130deg,rgba(39,39,42,0.08),rgba(39,39,42,0.02))] dark:bg-[radial-gradient(circle_at_top_left,rgba(240,192,64,0.3),transparent_50%),linear-gradient(130deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]" />
              </Card>
              <Card className="p-4">
                <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                  Active Markets
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded-lg bg-zinc-100/75 px-3 py-2 dark:bg-zinc-900/80">
                    <span className="text-zinc-700 dark:text-zinc-200">
                      Macro
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      34
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-100/75 px-3 py-2 dark:bg-zinc-900/80">
                    <span className="text-zinc-700 dark:text-zinc-200">
                      Politics
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      21
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-100/75 px-3 py-2 dark:bg-zinc-900/80">
                    <span className="text-zinc-700 dark:text-zinc-200">
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

        <section className="pb-20">
          <SectionTitle
            title="How It Works"
            subtitle="Three steps from connection to conviction."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Step
              icon={<Wallet className="size-5" />}
              title="Connect your account"
              body="Securely link your prediction market account in under a minute."
            />
            <Step
              icon={<Database className="size-5" />}
              title="View your portfolio"
              body="See positions, unrealized P&L, and exposure updated in real-time."
            />
            <Step
              icon={<BrainCircuit className="size-5" />}
              title="Get AI insights"
              body="Receive instant analysis tailored to your exact market activity."
            />
          </div>
        </section>

        <section className="pb-20">
          <SectionTitle
            title="Your Personal AI Trading Analyst"
            subtitle="A premium intelligence layer that reads your positions like a pro desk."
          />
          <Card className="mx-auto mt-10 max-w-4xl border-[#F0C040]/55 bg-white/80 p-6 shadow-[0_0_0_1px_rgba(240,192,64,0.35),0_28px_70px_-40px_rgba(240,192,64,0.9)] dark:bg-zinc-900/60">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                <Rocket className="size-4 text-[#F0C040]" />
                AI Analyst Output
              </div>
              <Badge className="border-[#F0C040]/60 bg-[#F0C040]/10 text-[#B38B18] dark:text-[#F0C040]">
                Live Insight
              </Badge>
            </div>
            <div className="space-y-4 rounded-xl border border-zinc-300/80 bg-zinc-100/60 p-5 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-300">
              <p>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Signal:
                </span>{" "}
                Your portfolio is overweight in short-horizon political
                contracts with a 0.81 correlation to macro volatility events.
              </p>
              <p>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Risk:
                </span>{" "}
                Concentration risk is elevated. A single market shock could
                impact 18-22% of total capital.
              </p>
              <p>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Action:
                </span>{" "}
                Reduce exposure by 7% in top-heavy positions and rebalance into
                lower-correlation event categories to stabilize drawdown
                probability.
              </p>
              <div className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="size-4" />
                Confidence score: 94%
              </div>
            </div>
          </Card>
        </section>

        <section className="pb-20">
          <Card className="border-[#F0C040]/45 bg-zinc-900 p-10 text-center shadow-[0_24px_65px_-36px_rgba(240,192,64,0.95)] dark:bg-zinc-950">
            <h3 className="text-3xl font-semibold text-zinc-100 md:text-4xl">
              Start analyzing your portfolio today
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Built for traders who move fast and think in probabilities.
            </p>
            <div className="mt-8">
              <Button className="px-8 py-3.5 text-base">Connect Now</Button>
            </div>
          </Card>
        </section>

        <footer className="border-t border-zinc-300/70 py-8 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
            <p>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Bayse Portfolio Tracker + AI Analyst
              </span>{" "}
              • GDG Hackathon 2026
            </p>
            <div className="flex items-center gap-4">
              <Link className="hover:text-[#F0C040]" href="#">
                GitHub
              </Link>
              <Link className="hover:text-[#F0C040]" href="#">
                Docs
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
