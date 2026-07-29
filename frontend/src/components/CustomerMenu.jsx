import { NavLink, useLocation } from "react-router-dom";
import UserDropdown from "./UserDropdown";

function CustomerMenu() {
    const location = useLocation();
    return (
        <>
            {/* Center Navigation */}
            <ul className="navbar-nav mx-auto">

            <li className="nav-item">
            <NavLink
                to="/"
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
                className={`nav-link ${
                    location.pathname === "/" && location.hash !== "#menu"
                        ? "active-link"
                        : ""
                }`}
            >
                Home
            </NavLink>
            </li>

            <li className="nav-item">
                <NavLink
                    to="/#menu"
                    className={`nav-link ${
                        location.hash === "#menu"
                            ? "active-link"
                            : ""
                    }`}
                >
                    Menu
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                    <i className="bi bi-heart me-1"></i>
                    Wishlist
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                    Cart
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink
                    to="/myorders"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                    My Orders
                </NavLink>
            </li>

            </ul>

            {/* Right Side */}
            <UserDropdown />
        </>
    );
}

export default CustomerMenu;