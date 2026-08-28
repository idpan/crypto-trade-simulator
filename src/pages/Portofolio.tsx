import { getPortofolio } from "../hooks/usePortofolio";
import { coinData } from "../data/coins";
import { Link } from "react-router";
export default function Portofolio() {
  const { holdings } = getPortofolio();

  return (
    <>
      <h1>Portofolio</h1>

      {!holdings[0] ? (
        <>
          <h2>Belum ada holdings</h2>
          <p className="mb-10">
            Beli koin di halaman Market untuk mulai membangun portofolio
          </p>
          <Link to="/market" className="bg-black text-white p-5 rounded-lg">
            Ke halaman Market
          </Link>
        </>
      ) : (
        holdings?.map((holding) => {
          const coin = coinData.find((c) => c.id === holding.coinId);

          if (!coin) return null; // jaga-jaga kalau coinId gak ketemu

          return (
            <div
              key={holding.coinId}
              className="border border-black w-96 grid grid-cols-4"
            >
              <div>
                <img
                  src={`/logos/${coin.logo}`}
                  alt={coin.name}
                  className="w-8 h-8"
                />
              </div>
              <div>
                <p className="font-bold">{coin.name}</p>
                <p className="text-gray-400">{coin.ticker}</p>
              </div>
              <div>
                <p>{holding.qty}</p>
                <p className="text-xl">{holding.avgPrice}</p>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
