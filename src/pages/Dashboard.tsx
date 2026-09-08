import { useEffect, useState } from "react";
import {
  clearPortofolio,
  getPortofolio,
  INITIAL_BALANCE,
} from "../hooks/usePortofolio";
import { fetchTicker } from "../services/binance";
import { mergeCoinData } from "../utils/mergeCoinData";
import type { CoinData } from "../types";
import { Link } from "react-router";
import HoldingCard from "../components/HoldingCard";

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
  const holdingPreview = holdings.slice(0, 3);

  function handleResetSimulation() {
    const confirmationMessage =
      "Yakin ingin reset simulasi? Semua saldo, holdings, dan riwayat transaksi akan dihapus dan tidak bisa dikembalikan.";

    if (!confirm(confirmationMessage)) return;

    clearPortofolio();

    alert("Simulasi berhasil direset. Saldo kembali ke 10.000 USDT.");
  }

  return (
    <div>
      <button
        onClick={handleResetSimulation}
        className="bg-red-400 border border-black p-3 rounded-md  "
      >
        Reset Simulasi
      </button>
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
      <div id="holding-preview">
        {!holdings[0] ? (
          <>
            <h2>Belum ada holdings</h2>
            <p className="mb-10">
              Beli koin di halaman Market untuk mulai membangun portofolio
            </p>
            <Link to="/market" className="bg-black text-white p-5 rounded-lg">
              Ke halaman Market
            </Link>
          </>
        ) : (
          <>
            {holdingPreview.map((holding) => {
              const coin = coins.find((c) => c.id === holding.coinId);
              if (!coin) return null;

              return (
                <HoldingCard
                  key={holding.coinId}
                  coinId={holding.coinId}
                  coinLogo={coin.logo}
                  coinName={coin.name}
                  coinTicker={coin.ticker}
                  qty={holding.qty}
                  avgPrice={holding.avgPrice}
                ></HoldingCard>
              );
            })}

            <Link
              to="/portofolio"
              className="bg-black text-white p-3 rounded-md"
            >
              Lihat semua
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
