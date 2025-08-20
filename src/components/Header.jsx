import { Link } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";
import {useLocation} from "react-router-dom";

export default function Header() {
    
    const {noOfUniqueProductsInCart, noOfProductsInWishlist, handleSearch} = useProductContext();
    const {pathname} = useLocation();
    return (
        <header className="text-secondary">
            <nav className="nav container px-4 py-2 align-items-center justify-content-between gap-1">

                <Link to="/" className="navbar-brand fw-bold">
                    <h5 className="fw-bold">MyShoppingSite</h5>
                </Link>
                <input 
                    type="search" 
                    name="search" 
                    id="search"
                    placeholder="🔍 Search"
                    className="px-5 py-2 rounded border"
                    onChange={handleSearch}
                />
                <ul className="navbar-nav flex-row gap-3">

                    <li className="nav-item">
                        <Link to="/products" className={`nav-link ${pathname === "/products" ? "active fw-bold border-bottom border-primary border-5" : ""}`}>
                            <h5>Products</h5>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/wishlist" className={`nav-link ${pathname === "/wishlist" ? "active fw-bold border-bottom border-primary border-5" : ""}`}>
                        <h4>
                            ♡
                            <sup className="fw-bold text-danger">
                                {noOfProductsInWishlist}
                            </sup>
                        </h4>
                        
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className={`nav-link ${pathname === "/cart" ? "active fw-bold border-bottom border-primary border-5" : ""}`}>
                        <h5>
                            🛒
                            <sup className="fw-bold text-danger">
                                {noOfUniqueProductsInCart}
                            </sup>
                        </h5>
                        
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className={`nav-link ${pathname === "/profile" ? "active fw-bold border-bottom border-primary border-5" : ""}`}>
                        <h5>👤</h5>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}