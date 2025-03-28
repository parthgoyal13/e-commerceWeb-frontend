import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import Cart from "./pages/Cart";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:category" element={<ProductListingPage />} />

      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
