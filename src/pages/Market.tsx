import { useEffect, useState } from "react";
import type { CoinDisplay } from "../types";
import { fetchTicker } from "../services/binance";
import { mergeCoinData } from "../utils/mergeCoinData";
import MarketCard from "../components/MarketCard";

export default function Market() {
  const [coins, setCoins] = useState<CoinDisplay[]>([]);
  useEffect(() => {
    fetchTicker().then((data) => setCoins(mergeCoinData(data)));
  }, []);
  return (
    <>
      <div className="border border-black ">
        {coins.map((coin: CoinDisplay): any => {
          return (
            <>
              <MarketCard />
              <div
                key={coin.id}
                className="border border-black w-96 grid grid-cols-4"
              >
                <div>
                  <i>{coin.logo}</i>
                </div>
                <div>
                  <p className="font-bold">{coin.name}</p>
                  <p className="text-gray-400">{coin.ticker}</p>
                </div>
                <div>
                  <p className="text-xl">{coin.price}</p>
                  <p>{coin.changePercent}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
