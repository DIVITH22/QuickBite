import { NavLink } from "react-router-dom";
import UserDropdown from "./UserDropdown";

function AdminMenu() {

    return (

        <>
            {/* Center Navigation */}
            <ul className="navbar-nav mx-auto">

                <li className="nav-item">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                    Dashboard
                </NavLink>
                </li>

                <li className="nav-item">
                <NavLink
                    to="/admin/foods"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                    Manage Foods
                </NavLink>
                </li>

                <li className="nav-item">
                <NavLink
                    to="/admin/add-food"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                    Add Food
                </NavLink>                </li>

                <li className="nav-item">
                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                   Manage Orders
                </NavLink>
                </li>

            </ul>

            {/* Right Side */}
            <UserDropdown />

        </>

    );

}

export default AdminMenu;