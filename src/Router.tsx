import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routers/Coin";
import Coins from "./routers/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
