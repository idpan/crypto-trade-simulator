export interface CoinMeta {
  id: string;
  ticker: string;
  trading_pair: string;
  name: string;
  logo: string;
}

export interface CoinDisplay {
  id: string; // 'bitcoin'
  ticker: string; // 'BTC'
  trading_pair: string; //'BTCUSDT'
  name: string; // 'Bitcoin'
  logo: string;
  price: any;
  changePercent: any;
}

export interface Holding {
  coinId: string;
  qty: number;
  avgPrice: number;
}

export interface Transaction {
  id: string;
  coinId: string;
  type: "buy" | "sell";
  qty: number;
  price: number;
  total: number;
  timestamp: number;
}

export interface PortfolioState {
  cash: number;
  holdings: Holding[];
  transactions: Transaction[];
  // portfolioHistory: { timestamp: number; totalValue: number }[]; // buat chart
}
