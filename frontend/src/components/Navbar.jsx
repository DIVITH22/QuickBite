import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

import GuestMenu from "./GuestMenu";
import CustomerMenu from "./CustomerMenu";
import AdminMenu from "./AdminMenu";


function Navbar() {

    // 使用useState管理滚动状态
    const [scrolled, setScrolled] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (

        <nav
            className={`navbar navbar-expand-lg fixed-top custom-navbar ${
                scrolled ? "navbar-scrolled" : ""
            }`}
        >

            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand logo" to="/">
                    🍔 QuickBite
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                    aria-controls="navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation */}
                <div className="collapse navbar-collapse" id="navbar">

                    {!user && <GuestMenu />}

                    {role === "customer" && <CustomerMenu />}

                    {role === "admin" && <AdminMenu />}

                </div>

            </div>

        </nav>

    );

}

export default Navbar;