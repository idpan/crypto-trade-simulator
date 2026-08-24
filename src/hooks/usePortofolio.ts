import type { Holding, PortfolioState, Transaction } from "../types";

const STORAGE_KEY = "portofolio_state";
const INITIAL_BALANCE = 100_000_000;

const defaultPortofolio = (): PortfolioState => ({
  cash: INITIAL_BALANCE,
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
    id: Date.now().toString(),
    coinId,
    type,
    qty,
    price,
    total,
    timestamp: Date.now(),
  };

  if (type === "buy") portofolio.cash = portofolio.cash - total;
  portofolio.holdings.push(holding);
  portofolio.transactions.push(transaction);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(portofolio));
};
