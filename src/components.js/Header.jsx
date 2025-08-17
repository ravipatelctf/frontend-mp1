import { Link } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";

export default function Header() {
    
    const {noOfUniqueProductsInCart, noOfProductsInWishlist} = useProductContext();
    return (
        <header className="text-secondary">
            <nav className="nav container px-4 py-2 align-items-center justify-content-between gap-1">

                <Link to="/" className="navbar-brand fw-bold">
                    MyShoppingSite
                </Link>
                <ul className="navbar-nav flex-row gap-2">

                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products" className="nav-link">
                            Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/wishlist" className="nav-link">
                        ♡
                        <sup className="fw-bold text-danger">
                            {noOfProductsInWishlist}
                        </sup>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                        🛒
                        <sup className="fw-bold text-danger">
                            {noOfUniqueProductsInCart}</sup>
                        </Link>
                    </li>

                </ul>
            </nav>
        </header>
    );
}