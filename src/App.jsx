import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Header from "./components.js/Header";
import Footer from "./components.js/Footer";
import ProductDetails from "./pages/ProductDetails";
import ProductCart from "./pages/ProductCart";
import {ProductProvider} from "./contexts/ProductContext";


export default function App() {
  
  return (
    <ProductProvider >
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<ProductCart />} />
        </Routes>
        <Footer />
    </Router>
    </ProductProvider >
  )
}

