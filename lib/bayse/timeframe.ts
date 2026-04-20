/**
 * Maps app timeframe labels to Bayse `timePeriod` query values.
 * @see https://docs.bayse.markets/api-reference/pm/get-pnl.md
 */
export function toBayseTimePeriod(
  timeframe: string
): string | undefined {
  switch (timeframe) {
    case '1D':
      return '24H';
    case '1W':
      return '1W';
    case '1M':
      return '1M';
    case '1Y':
      return '1Y';
    case 'ALL':
      return undefined;
    default:
      return '1M';
  }
}
