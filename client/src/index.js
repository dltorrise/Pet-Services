import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Cart from "./components/cart";

export default function Index() {
return (
<BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path= 'cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index/>);



