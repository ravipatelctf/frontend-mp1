import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import {ProductProvider} from "./contexts/ProductContext";
import UserProfile from "./pages/UserProfile";


export default function App() {
  
  return (
    <ProductProvider >
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<UserProfile />} />
        </Routes>
        <Footer />
    </Router>
    </ProductProvider >
  )
}

