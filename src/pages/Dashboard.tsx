import { useEffect, useState } from "react";
import { getPortofolio, INITIAL_BALANCE } from "../hooks/usePortofolio";
import { fetchTicker } from "../services/binance";
import { mergeCoinData } from "../utils/mergeCoinData";
import type { CoinData } from "../types";
export default function Dashboard() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  useEffect(() => {
    fetchTicker().then((data) => setCoins(mergeCoinData(data)));
  }, []);

  const { holdings, balance } = getPortofolio();
  const totalHoldingsValue = holdings.reduce((sum, h) => {
    const coin = coins.find((c) => c.id === h.coinId);
    return sum + (coin ? h.qty * coin.price : 0);
  }, 0);
  const totalPortfolioValue = balance + totalHoldingsValue;
  const pnl = totalPortfolioValue - INITIAL_BALANCE;
  const pnl_percent = (pnl / INITIAL_BALANCE) * 100;
  return (
    <div
      id="portofolio-summary-card"
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4"
    >
      <div>
        <p className="text-sm text-gray-500">total nilai portofolio</p>
        <p className="text-3xl font-bold text-gray-900">
          {"USDT " + totalPortfolioValue.toLocaleString()}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-500">saldo USDT</p>
          <p className="text-lg font-medium text-gray-800">
            {"USDT " + balance.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">untung rugi</p>
          {pnl >= 0 ? (
            <p className="text-lg font-medium text-green-600">
              {`+${pnl.toLocaleString()} (+${pnl_percent.toFixed(2)}%)`}
            </p>
          ) : (
            <p className="text-lg font-medium text-red-600">
              {`${pnl.toLocaleString()} (${pnl_percent.toFixed(2)}%)`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
