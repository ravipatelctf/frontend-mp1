import { Link } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";
import {useLocation} from "react-router-dom";

export default function Header() {
    
    const {noOfUniqueProductsInCart, noOfProductsInWishlist, handleSearch} = useProductContext();
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
                    <NavItem uri="/products">
                        <h5>Products</h5>
                    </NavItem>
                    <NavItem uri="/wishlist">
                        <h4>♡<sup className="fw-bold text-danger">{noOfProductsInWishlist}</sup></h4>
                    </NavItem>
                    <NavItem uri="/cart">
                        <h5>🛒<sup className="fw-bold text-danger">{noOfUniqueProductsInCart}</sup></h5>
                    </NavItem>
                    <NavItem uri="/profile">
                        <h5>👤</h5>
                    </NavItem>
                </ul>
            </nav>
        </header>
    );
}

function NavItem({uri, children}) {
    const {pathname} = useLocation();
    return (
        <li className="nav-item">
            <Link to={uri} className={`nav-link ${pathname === uri ? "active fw-bold border-bottom border-primary border-5" : ""}`}>
                {children}
            </Link>
        </li>
    );
}