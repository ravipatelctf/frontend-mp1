import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Header from "./components.js/Header";
import Footer from "./components.js/Footer";
import ProductDetails from "./pages/ProductDetails";


export default function App() {
  
  return (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
        <Footer />
    </Router>
  )
}

