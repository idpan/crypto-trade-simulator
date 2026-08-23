import type { CoinDisplay } from "../types";
export default function MarketCard({
  id,
  logo,
  name,
  ticker,
  price,
  changePercent,
}): CoinDisplay {
  return (
    <>
      <div key={id} className="border border-black w-96 grid grid-cols-4">
        <div>
          <i>{logo}</i>
        </div>
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-gray-400">{ticker}</p>
        </div>
        <div>
          <p className="text-xl">{price}</p>
          <p>{changePercent}</p>
        </div>
      </div>
    </>
  );
}
