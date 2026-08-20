interface Coin {
  id: string; // 'bitcoin'
  symbol: string; // 'BTC'
  name: string; // 'Bitcoin'
  logo: string;
  currentPrice: number;
  priceChange24h: number; // persentase
}

interface Holding {
  coinId: string;
  amount: number;
  averageBuyPrice: number;
}

interface Transaction {
  id: string;
  coinId: string;
  type: "buy" | "sell";
  amount: number;
  priceAtTransaction: number;
  timestamp: number;
}

interface PortfolioState {
  cashBalance: number;
  holdings: Holding[];
  transactions: Transaction[];
  portfolioHistory: { timestamp: number; totalValue: number }[]; // buat chart
}
