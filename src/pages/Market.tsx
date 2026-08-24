import { useEffect, useState } from "react";
import { fetchTicker } from "../services/binance";
import { mergeCoinData } from "../utils/mergeCoinData";
import type { MarketCardProps } from "../components/MarketCard";

import MarketCard from "../components/MarketCard";
import { getPortofolio } from "../hooks/usePortofolio";
import type { PortfolioState } from "../types";

export default function Market() {
  const [coins, setCoins] = useState<MarketCardProps[]>([]);
  useEffect(() => {
    fetchTicker().then((data) => setCoins(mergeCoinData(data)));
  }, []);
  const portofolio: PortfolioState = getPortofolio();
  console.log(portofolio);
  return (
    <>
      <div className="border border-black ">
        {coins.map((coin: MarketCardProps): any => {
          return (
            <>
              <MarketCard
                logo={coin.logo}
                name={coin.name}
                ticker={coin.ticker}
                price={coin.price}
                changePercent={coin.changePercent}
              />
            </>
          );
        })}
      </div>
    </>
  );
}
