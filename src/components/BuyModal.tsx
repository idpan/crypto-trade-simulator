import { useState } from "react";

interface BuyModalProps {
  coinName: string;
  coinSymbol: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export default function BuyModal({
  coinName,
  coinSymbol,
  isOpen,
  onClose,
  onSubmit,
}: BuyModalProps) {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;
    onSubmit(numAmount);
    setAmount("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4">
          Beli {coinName} ({coinSymbol.toUpperCase()})
        </h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Jumlah (Rp)"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 border rounded py-2">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-500 text-white rounded py-2"
          >
            Beli
          </button>
        </div>
      </div>
    </div>
  );
}
