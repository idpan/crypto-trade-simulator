interface SellModalProps {
  coinLogo: string;
  coinName: string;
  coinTicker: string;
  // coinPrice: String;
  coinQty: number;

  onClose: () => void;
}
export default function SellModal({
  coinLogo,
  coinName,
  coinTicker,
  // coinPrice,
  coinQty,
  onClose,
}: SellModalProps) {
  return (
    <div className="w-80 h-30">
      <div className="flex justify-between">
        <div className="bg-blue-200">
          <div>{coinLogo}</div>
          <div>
            <p>Jual {coinName} </p>
            <p> -coinPrice- </p>
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
        <input type="text" />
        <button>MAX</button>
        <p>Dipegang: {coinQty} </p>
      </div>
      <div>
        <div>
          <p>Akan diterima</p>
          <p>-coinInput * coinPrice-</p>
        </div>
      </div>
      <div>
        <button>Batal</button>
        <button>Konfirmasi Jual</button>
      </div>
    </div>
  );
}
