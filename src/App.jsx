import { Navigate, Route, Routes } from "react-router-dom";
import Products from "./pages/ProductsPage";
import Checkout from "./pages/CheckoutPage";
import DetailPage from "./pages/DetailPage";
import PageNotFound from "./pages/404";
import { ProductsProvider } from "./contextData/ProductsContext";
import { CartProvider } from "./contextData/CartContext";
import Layout from "./layout/Layout";

function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<DetailPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </ProductsProvider>
    </CartProvider>
  );
}

export default App;
