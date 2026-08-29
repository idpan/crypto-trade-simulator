import { useState, useMemo } from "react";

interface BuyModalProps {
  coinName: string;
  coinSymbol: string;
  coinPrice: number; // harga per koin dalam USDT
  balance: number; // saldo virtual saat ini
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void; // amount = jumlah koin yang dibeli
}

export default function BuyModal({
  coinName,
  coinSymbol,
  coinPrice,
  balance,
  isOpen,
  onClose,
  onSubmit,
}: BuyModalProps) {
  const [nominal, setNominal] = useState(""); // user input dalam USDT

  if (!isOpen) return null;

  const nominalNum = parseFloat(nominal) || 0;
  const coinAmount = coinPrice > 0 ? nominalNum / coinPrice : 0;
  const isInsufficientBalance = nominalNum > balance;
  const isInvalid = nominalNum <= 0 || isInsufficientBalance;

  const handleSubmit = () => {
    if (isInvalid) return;
    onSubmit(coinAmount);
    setNominal("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-1">
          Beli {coinName} ({coinSymbol.toUpperCase()})
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Harga: USDT {coinPrice.toLocaleString("id-ID")}
        </p>

        <input
          type="number"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
          placeholder="Nominal (USDT)"
          className="w-full border rounded px-3 py-2"
        />

        <div className="text-sm text-gray-600 mt-2 mb-1">
          Kamu dapat: {coinAmount.toFixed(6)} {coinSymbol.toUpperCase()}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Saldo tersedia: USDT {balance.toLocaleString("id-ID")}
        </div>

        {isInsufficientBalance && nominalNum > 0 && (
          <p className="text-red-500 text-sm mb-3">Saldo tidak cukup.</p>
        )}

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 border rounded py-2">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isInvalid}
            className="flex-1 bg-green-500 text-white rounded py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Beli
          </button>
        </div>
      </div>
    </div>
  );
}
