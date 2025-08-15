import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="text-secondary">
            <nav className="nav container px-4 py-2 align-items-center justify-content-between">

                <Link to="/" className="navbar-brand fw-bold">
                    MyShoppingSite
                </Link>
                <ul className="navbar-nav flex-row gap-5">

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

                </ul>
            </nav>
        </header>
    );
}