import { getPortofolio, saveTransaction } from "../hooks/usePortofolio";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import type { CoinData, Holding } from "../types";
import SellModal from "../components/SellModal";
import { fetchTicker } from "../services/binance";
import { mergeCoinData } from "../utils/mergeCoinData";
export default function Portofolio() {
  const [selectedCoin, setSelectedCoin] = useState<Holding | null>(null);

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

  return (
    <>
      <h1>Portofolio</h1>
      <div>
        <h2>Alokasi Portofolio</h2>

        {balance > 0 ? (
          <div className="flex gap-10">
            <p>USDT</p>
            <p>{((balance / totalPortfolioValue) * 100).toFixed(1)}%</p>
          </div>
        ) : (
          ""
        )}
        {
          // assumption holding is not empty
          holdings.map((holding) => {
            const coin = coins.find((c) => c.id === holding.coinId);
            if (!coin) return null;

            return (
              <>
                <div className="flex gap-10">
                  <p>{coin.ticker}</p>
                  <p>
                    {(
                      ((holding.qty * coin.price) / totalPortfolioValue) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </>
            );
          })
        }
      </div>

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
        holdings?.map((holding) => {
          const coin = coins.find((c) => c.id === holding.coinId);
          if (!coin) return null;

          return (
            <>
              <div
                key={holding.coinId}
                className="border border-black w-96 grid grid-cols-4"
              >
                <div>
                  <img
                    src={`/logos/${coin.logo}`}
                    alt={coin.name}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <p className="font-bold">{coin.name}</p>
                  <p className="text-gray-400">{coin.ticker}</p>
                </div>
                <div>
                  <p>{holding.qty}</p>
                  <p className="text-xl">{holding.avgPrice}</p>
                </div>
                <button
                  className="bg-red-500 text-black p-3 rounded-lg"
                  onClick={() => {
                    setSelectedCoin(holding);
                  }}
                >
                  Jual
                </button>
              </div>

              {selectedCoin && (
                <SellModal
                  coinLogo={coin.logo}
                  coinName={coin.name}
                  coinPrice={coin.price}
                  coinTicker={coin.ticker}
                  coinQty={selectedCoin.qty}
                  onClose={() => {
                    setSelectedCoin(null);
                  }}
                  onSubmit={(amount) => {
                    try {
                      const confirmationMessage = `apakah ingin lanjut menjual ${amount} ${coin.ticker} seharga ${(amount * coin.price).toFixed(2)} ?`;
                      if (!confirm(confirmationMessage)) return;

                      saveTransaction(
                        selectedCoin.coinId,
                        amount,
                        coin.price,
                        "sell",
                      );
                      const successMessage = `Penjualan ${amount} ${coin.ticker} seharga ${(amount * coin.price).toFixed(2)} sukses !!! `;
                      alert(successMessage);
                      setSelectedCoin(null);
                    } catch (error) {
                      alert(`Penjualan gagal karna ${error}`);
                    }
                  }}
                />
              )}
            </>
          );
        })
      )}
    </>
  );
}
