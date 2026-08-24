import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import { getPortofolio } from "./hooks/usePortofolio";

import Market from "./pages/Market";
import History from "./pages/History";
import Portofolio from "./pages/Portofolio";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
      <nav className="flex gap-10 p-10 border justify-center">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/market">Market</NavLink>
        <NavLink to="/portofolio">Portofolio</NavLink>
        <NavLink to="/history">History</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/portofolio" element={<Portofolio />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}
