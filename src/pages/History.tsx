import { getPortofolio } from "../hooks/usePortofolio";
import { coinData } from "../data/coins";
import { useState } from "react";

export default function History() {
  const { transactions } = getPortofolio();
  const [filterType, setFilterType] = useState<"all" | "buy" | "sell">("all");
  const [filterCoin, setFilterCoin] = useState<string>("all");

  const filteredTransactions = transactions.filter((tx) => {
    const matchType = filterType === "all" || tx.type === filterType;
    const matchCoin = filterCoin === "all" || tx.coinId === filterCoin;
    return matchType && matchCoin;
  });
  const uniqeCoins = Array.from(
    new Map(transactions.map((tx) => [tx.coinId, { id: tx.coinId }])).values(),
  );

  return (
    <>
      <h1>History</h1>
      <select
        onChange={(e) =>
          setFilterType(e.target.value as "all" | "buy" | "sell")
        }
        value={filterType}
      >
        <option value="all">Semua Jenis</option>
        <option value="buy">Beli</option>
        <option value="sell">Jual</option>
      </select>
      <select
        value={filterCoin}
        onChange={(e) => setFilterCoin(e.target.value)}
      >
        <option value="all">Semua Coin</option>
        {uniqeCoins.map((coin) => {
          return (
            <option key={coin.id} value={coin.id}>
              {coin.id}
            </option>
          );
        })}
      </select>
      {filteredTransactions.map((transaction) => {
        const coin = coinData.find((c) => c.id === transaction.coinId);
        if (!coin) return null;
        const time = new Date(transaction.timestamp).toLocaleString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <div key={transaction.id} className="p-5 border-b-2 border-t-2">
            <div className="flex justify-between">
              <div>
                <p>{coin.ticker}</p>
                {transaction.type == "buy" ? (
                  <p className="font-bold text-green-500">{transaction.type}</p>
                ) : (
                  <p className="font-bold text-red-500">{transaction.type}</p>
                )}
              </div>
              <p>{time}</p>
            </div>
            <div className="flex justify-between">
              <p>Price : </p>
              <p>{transaction.price}</p>
            </div>
            <div className="flex justify-between">
              <p>Jumlah coin :</p>
              <p>{transaction.qty}</p>
            </div>
            <div className="flex justify-between">
              <p>Total :</p>
              <p>{transaction.total}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
