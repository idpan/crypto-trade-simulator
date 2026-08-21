import type { CoinDisplay } from "../types/index";
import type { Binance24hrTicker } from "../types/binance";
import { coinData } from "../data/coins";
export function mergeCoinData(ticker: Binance24hrTicker[]): CoinDisplay[] {
  return coinData.map((coin): CoinDisplay => {
    const t = ticker.find((t) => t.symbol === coin.trading_pair);
    return {
      id: coin.id,
      ticker: coin.ticker,
      name: coin.name,
      trading_pair: coin.trading_pair,
      logo: coin.logo,
      price: t ? parseFloat(t.lastPrice) : 0,
      changePercent: t ? parseFloat(t.priceChangePercent) : 0,
    };
  });
}
