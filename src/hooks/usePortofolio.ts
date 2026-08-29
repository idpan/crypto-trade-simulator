import type { Holding, PortfolioState, Transaction } from "../types";

const STORAGE_KEY = "portofolio_state";
const INITIAL_BALANCE = 100_000_000;

const defaultPortofolio = (): PortfolioState => ({
  balance: INITIAL_BALANCE,
  holdings: [],
  transactions: [],
});

export const getPortofolio = (): PortfolioState => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const defaultPortofolioValue = defaultPortofolio();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPortofolioValue));
    return defaultPortofolioValue;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.log(error);
    return defaultPortofolio();
  }
};

export const saveTransaction = (
  coinId: string,
  qty: number,
  price: number,
  type: "buy" | "sell",
) => {
  const portofolio = getPortofolio();
  const total = qty * price;
  const holding: Holding = { coinId, qty, avgPrice: price };
  const transaction: Transaction = {
    id: type + coinId + Date.now().toString(),
    coinId,
    type,
    qty,
    price,
    total,
    timestamp: Date.now(),
  };

  const existingIndex = portofolio.holdings.findIndex((h: Holding) => {
    return h.coinId === coinId;
  });

  if (type === "buy") {
    portofolio.balance = portofolio.balance - total;

    if (existingIndex != -1) {
      portofolio.holdings = portofolio.holdings.map(
        (holding: Holding): Holding => {
          if (holding.coinId === coinId) {
            const newQty = holding.qty + qty;
            const newAvgPrice =
              (holding.avgPrice * holding.qty + total) / newQty;
            return { ...holding, qty: newQty, avgPrice: newAvgPrice };
          }

          return holding;
        },
      );
    } else {
      portofolio.holdings.push(holding);
    }
  }

  portofolio.transactions.push(transaction);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(portofolio));
};
