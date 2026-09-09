import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUp, ArrowDown } from "lucide-react";

interface CoinPulse {
  symbol: string;
  price: number;
  prevPrice: number;
  changePercent: number;
  logo: string;
}

const COINS = [
  { symbol: "btcusdt", logo: "btc.png" },
  { symbol: "ethusdt", logo: "eth.png" },
  { symbol: "bnbusdt", logo: "bnb.png" },
  { symbol: "solusdt", logo: "sol.png" },
  { symbol: "xrpusdt", logo: "xrp.png" },
];

export default function MarketPulseCard() {
  const [pulses, setPulses] = useState<Record<string, CoinPulse>>({});
  const [flashing, setFlashing] = useState<
    Record<string, "up" | "down" | null>
  >({});

  // Simpan timer ID agar bisa di-clear untuk mencegah memory leak
  const timersRef = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    const streams = COINS.map((c) => `${c.symbol}@ticker`).join("/");
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`,
    );

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const data = msg.data;
        if (!data) return;

        const symbol = (data.s as string).toUpperCase();
        const price = parseFloat(data.c);
        const changePercent = parseFloat(data.P);
        const logo =
          COINS.find((c) => c.symbol.toUpperCase() === symbol)?.logo ?? "";

        setPulses((prev) => {
          const prevPrice = prev[symbol]?.price ?? price;

          // Trigger efek flashing hanya jika harga berubah
          if (price !== prevPrice) {
            const direction = price > prevPrice ? "up" : "down";

            // Hapus timer lama jika ada perubahan cepat
            if (timersRef.current[symbol]) {
              clearTimeout(timersRef.current[symbol]);
            }

            setFlashing((f) => ({ ...f, [symbol]: direction }));

            // Reset flashing setelah 600ms
            timersRef.current[symbol] = setTimeout(() => {
              setFlashing((f) => ({ ...f, [symbol]: null }));
            }, 600);
          }

          return {
            ...prev,
            [symbol]: { symbol, price, prevPrice, changePercent, logo },
          };
        });
      } catch (err) {
        console.error("Gagal parse data WebSocket:", err);
      }
    };

    ws.onerror = (err) => console.error("Market pulse WS error:", err);

    return () => {
      ws.close();
      // Bersihkan semua timer saat unmount
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-700">Pantauan Pasar</p>
        <Link to="/market" className="text-sm text-blue-600 hover:underline">
          Lihat semua →
        </Link>
      </div>

      <div className="space-y-3">
        {COINS.map(({ symbol: s }) => {
          const symbol = s.toUpperCase();
          const pulse = pulses[symbol];
          const flash = flashing[symbol];

          if (!pulse) {
            return (
              <div
                key={symbol}
                className="flex items-center justify-between text-gray-400 py-2"
              >
                <span className="text-sm font-medium">
                  {symbol.replace("USDT", "")}
                </span>
                <span className="text-xs">Menghubungkan...</span>
              </div>
            );
          }

          const isUp = pulse.changePercent >= 0;

          return (
            <div
              key={symbol}
              className={`flex items-center justify-between p-2 rounded-lg transition-colors duration-300 ${
                flash === "up"
                  ? "bg-green-50"
                  : flash === "down"
                    ? "bg-red-50"
                    : "bg-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={`/logos/${pulse.logo}`}
                  alt={symbol}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    // Fallback jika gambar gagal dimuat
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span className="font-medium text-sm text-gray-800">
                  {symbol.replace("USDT", "")}
                </span>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-gray-400 leading-none mb-0.5">
                  Harga
                </p>
                <p className="font-medium text-sm text-gray-900">
                  {"USDT " +
                    pulse.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                </p>
                <p className="text-[10px] text-gray-400 leading-none mt-1 mb-0.5">
                  24 Jam
                </p>
                <p
                  className={`text-xs flex items-center justify-end gap-0.5 ${
                    isUp ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {Math.abs(pulse.changePercent).toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
