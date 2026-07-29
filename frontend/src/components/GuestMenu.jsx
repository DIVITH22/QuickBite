import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";

function GuestMenu() {
    return (
        <>
            {/* Center Navigation */}
            <ul className="navbar-nav mx-auto">

            <li className="nav-item">
                <NavLink
                    to="/"
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

            </ul>

            {/* Right Side */}
            <ul className="navbar-nav align-items-center">

                <li className="nav-item me-3">
                    <Link className="login-link" to="/login">
                        Login
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="btn register-btn" to="/register">
                        Register
                    </Link>
                </li>

            </ul>
        </>
    );
}

export default GuestMenu;