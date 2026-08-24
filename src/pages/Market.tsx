import { useEffect, useState } from "react";
import { fetchTicker } from "../services/binance";
import { mergeCoinData } from "../utils/mergeCoinData";
import type { MarketCardProps } from "../components/MarketCard";

import MarketCard from "../components/MarketCard";
import { getPortofolio } from "../hooks/usePortofolio";
import type { PortfolioState } from "../types";
import BuyModal from "../components/BuyModal";

export default function Market() {
  const [coins, setCoins] = useState<MarketCardProps[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  useEffect(() => {
    fetchTicker().then((data) => setCoins(mergeCoinData(data)));
  }, []);
  const portofolio: PortfolioState = getPortofolio();
  return (
    <>
      <div className="border border-black ">
        {coins.map((coin: MarketCardProps, index): any => {
          return (
            <div key={coin.ticker + index + Date.now()}>
              <MarketCard
                logo={coin.logo}
                name={coin.name}
                ticker={coin.ticker}
                price={coin.price}
                changePercent={coin.changePercent}
              />
              <button onClick={() => setSelectedCoin(coin)}>Beli</button>
            </div>
          );
        })}
      </div>
      {selectedCoin && (
        <BuyModal
          coinName={selectedCoin.name}
          coinSymbol={selectedCoin.ticker}
          isOpen={!!selectedCoin}
          onClose={() => setSelectedCoin(null)}
          onSubmit={(amount) => {
            console.log("Buy submitted:", selectedCoin.id, amount); // placeholder
            setSelectedCoin(null);
          }}
        />
      )}
    </>
  );
}
