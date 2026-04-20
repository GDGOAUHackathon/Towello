import { getBayseClient } from '@/lib/bayse/client';
import { toBayseTimePeriod } from '@/lib/bayse/timeframe';
import type { PnLHistory, PnLSnapshot } from '@/types/pnl';
import type { BaysePnLResponse } from '@/lib/bayse/types';

export type AppTimeframe = PnLHistory['timeframe'];

function mapBaysePnLToHistory(
  bayse: BaysePnLResponse,
  timeframe: AppTimeframe
): PnLHistory {
  const now = new Date().toISOString();
  const snapshot: PnLSnapshot = {
    timestamp: now,
    totalPnL: bayse.realizedPnl,
    unrealizedPnL: 0,
    realizedPnL: bayse.realizedPnl,
    roi: bayse.realizedPnlPercent,
  };

  return {
    timeframe,
    snapshots: [snapshot],
    realizedPnl: bayse.realizedPnl,
    realizedPnlPercent: bayse.realizedPnlPercent,
    settlementPnl: bayse.settlementPnl,
    tradePnl: bayse.tradePnl,
    wins: bayse.wins,
    losses: bayse.losses,
    currency: bayse.currency,
    breakdown: bayse.breakdown ?? [],
  };
}

export class PnLService {
  async getPnLHistory(
    _userId: string,
    timeframe: string
  ): Promise<PnLHistory> {
    const tf = (['1D', '1W', '1M', '1Y', 'ALL'].includes(timeframe)
      ? timeframe
      : '1M') as AppTimeframe;

    const timePeriod = toBayseTimePeriod(tf);
    const bayse = await getBayseClient().getPnL({
      timePeriod,
      breakdown: true,
      currency: 'USD',
    });
    return mapBaysePnLToHistory(bayse, tf);
  }

  async calculateCurrentPnL(_userId: string) {
    const history = await this.getPnLHistory(_userId, '1M');
    const snap = history.snapshots[0];
    return {
      realizedPnL: snap.realizedPnL,
      roi: snap.roi,
      currency: history.currency,
    };
  }
}

export const pnlService = new PnLService();
