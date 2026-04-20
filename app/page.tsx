import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'Towello — Prediction market intelligence',
  description:
    'Hackathon-ready portfolio intelligence for Bayse prediction markets: live positions, PnL windows, and Gemini-powered briefings.',
  openGraph: {
    title: 'Towello — Prediction market intelligence',
    description:
      'Live Bayse data, realized PnL, and structured AI analysis — built for demo day.',
  },
};

export default function Home() {
  return <LandingPage />;
}
