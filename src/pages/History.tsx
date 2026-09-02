import { getPortofolio } from "../hooks/usePortofolio";
import { coinData } from "../data/coins";
export default function History() {
  const { transactions } = getPortofolio();

  console.log(transactions);
  return (
    <>
      <h1>History</h1>
      {transactions.map((transaction) => {
        const coin = coinData.find((c) => c.id === transaction.coinId);
        if (!coin) return null;
        const time = new Date(transaction.timestamp).toLocaleString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        console.log(time);
        return (
          <div className="p-5 border-b-2 border-t-2">
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
// coinId
// :
// "bitcoin"
// id
// :
// "buybitcoin1788029977192"
// price
// :
// 78162.01
// qty
// :
// 0.0012793939152793026
// timestamp
// :
// 1788029977192
// total
// :
// 100
// type
// :
// "buy"
