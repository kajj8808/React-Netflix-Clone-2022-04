import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chart from "./routers/Chart";
import Coin from "./routers/Coin";
import Coins from "./routers/Coins";
import Price from "./routers/Price";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
