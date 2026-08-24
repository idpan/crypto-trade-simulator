export interface MarketCardProps {
  logo: string;
  name: string; // 'Bitcoin'
  ticker: string; // 'BTC'
  price: number;
  changePercent: number;
}

export default function MarketCard({
  logo,
  name,
  ticker,
  price,
  changePercent,
}: MarketCardProps) {
  return (
    <>
      <div className="border border-black w-96 grid grid-cols-4">
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
