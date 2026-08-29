import { useEffect, useState } from "react";
import { fetchTicker } from "../services/binance";
import { mergeCoinData } from "../utils/mergeCoinData";
// import type { CoinData } from "../components/MarketCard";
import type { CoinData } from "../types";
import MarketCard from "../components/MarketCard";
import { getPortofolio, saveTransaction } from "../hooks/usePortofolio";
import type { PortfolioState } from "../types";
import BuyModal from "../components/BuyModal";

export default function Market() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const { balance } = getPortofolio();
  useEffect(() => {
    fetchTicker().then((data) => setCoins(mergeCoinData(data)));
  }, []);
  return (
    <>
      <div className="border border-black ">
        {coins.map((coin: CoinData, index): any => {
          return (
            <div key={coin.ticker + index + Date.now()}>
              <MarketCard
                logo={coin.logo}
                name={coin.name}
                ticker={coin.ticker}
                price={coin.price}
                changePercent={coin.changePercent}
              />
              <button
                onClick={() => {
                  setSelectedCoin(coin);
                }}
              >
                Beli
              </button>
            </div>
          );
        })}
      </div>
      {selectedCoin && (
        <BuyModal
          coinName={selectedCoin.name}
          coinSymbol={selectedCoin.ticker}
          coinPrice={selectedCoin.price}
          balance={balance}
          isOpen={!!selectedCoin}
          onClose={() => setSelectedCoin(null)}
          onSubmit={(amount) => {
            try {
              const confirmationMessage = `apakah ingin lanjut membeli ${amount} ${selectedCoin.ticker} seharga ${(amount * selectedCoin.price).toFixed(2)} ?`;
              if (!confirm(confirmationMessage)) return;

              saveTransaction(
                selectedCoin.id,
                amount,
                selectedCoin.price,
                "buy",
              );
              const successMessage = `Pembelian ${amount} ${selectedCoin.ticker} seharga ${(amount * selectedCoin.price).toFixed(2)} sukses !!! `;
              alert(successMessage);
              setSelectedCoin(null);
            } catch (error) {
              alert(`pembelian gagal karna ${error}`);
            }
          }}
        />
      )}
    </>
  );
}
