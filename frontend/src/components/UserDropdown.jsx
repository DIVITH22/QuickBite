import { useNavigate } from "react-router-dom";

function UserDropdown() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        window.location.reload();

    };

    return (

        <ul className="navbar-nav align-items-center">

            <li className="nav-item dropdown">

                <button
                    className="btn register-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                >
                    👤 {user?.name || "User"}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">

                    <li>
                        <button
                            className="dropdown-item"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>

                </ul>

            </li>

        </ul>

    );

}

export default UserDropdown;