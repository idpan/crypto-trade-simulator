interface HoldingCardProps {
  coinId: string;
  coinLogo: string;
  coinName: string;
  coinTicker: string;
  qty: number;
  avgPrice: number;
  onSell?: () => void;
}
export default function HoldingCard({
  coinId,
  coinLogo,
  coinName,
  coinTicker,
  qty,
  avgPrice,
  onSell,
}: HoldingCardProps) {
  return (
    <div key={coinId} className="border border-black w-96 grid grid-cols-4">
      <div>
        <img src={`/logos/${coinLogo}`} alt={coinName} className="w-8 h-8" />
      </div>
      <div>
        <p className="font-bold">{coinName}</p>
        <p className="text-gray-400">{coinTicker}</p>
      </div>
      <div>
        <p>{qty}</p>
        <p className="text-xl">{avgPrice}</p>
      </div>
      {onSell && (
        <button
          className="bg-red-500 text-black p-3 rounded-lg"
          onClick={onSell}
        >
          Jual
        </button>
      )}
    </div>
  );
}
