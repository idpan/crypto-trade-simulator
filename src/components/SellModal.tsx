import { useState } from "react";

interface SellModalProps {
  coinLogo: string;
  coinName: string;
  coinTicker: string;
  coinPrice: number;
  coinQty: number;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}
export default function SellModal({
  coinLogo,
  coinName,
  coinTicker,
  coinPrice,
  coinQty,
  onClose,
  onSubmit,
}: SellModalProps) {
  const [sellQty, setSellQty] = useState<string>("");

  const sellQtyNum = parseFloat(sellQty) || 0;
  const willReceiveAmount: number = sellQtyNum * coinPrice;
  const isInsufficientBalance = sellQtyNum > coinQty;
  const isInvalid = sellQtyNum <= 0 || isInsufficientBalance;

  const handleSubmit = () => {
    if (isInvalid) return;
    onSubmit(sellQtyNum);
    setSellQty("");
  };
  return (
    <div className="w-80 h-30">
      <div className="flex justify-between">
        <div className="bg-blue-200">
          <div>{coinLogo}</div>
          <div>
            <p>Jual {coinName} </p>
            <p> {coinPrice} </p>
          </div>
        </div>
        <div>
          <button className="bg-red-400 p-3" onClick={onClose}>
            close
          </button>
        </div>
      </div>
      <div>
        <p>Jumlah {coinTicker} yang dijual</p>
        <input
          value={sellQty}
          onChange={(e) => {
            setSellQty(e.target.value);
          }}
          type="number"
        />
        <button
          onClick={() => {
            setSellQty(`${coinQty}`);
          }}
        >
          MAX
        </button>
        <p>Dipegang: {coinQty} </p>
      </div>
      <div>
        <div>
          <p>Akan diterima</p>
          <p>{willReceiveAmount}</p>
        </div>
      </div>
      <div>
        <button onClick={onClose}>Batal</button>
        <button
          onClick={handleSubmit}
          disabled={isInvalid}
          className="bg-black p-3 text-white  disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Konfirmasi Jual
        </button>
      </div>
    </div>
  );
}
