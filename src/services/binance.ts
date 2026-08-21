import { coinData } from "../data/coins";
import type { Binance24hrTicker } from "../types/binance";

export async function fetchTicker(): Promise<Binance24hrTicker[]> {
  const symbol = coinData.map((c) => c.trading_pair);
  const url = `https://api1.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(symbol))}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fail to fetch Ticker");
  return res.json();
}
