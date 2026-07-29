import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/AdminDashboard.css";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({
        users: 0,
        foods: 0,
        orders: 0,
        revenue: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await api.get("/dashboard");
            setDashboard(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="page-content container mt-4">

            <h2 className="mb-4">📊 Admin Dashboard</h2>

            <div className="row g-4">

                <div className="col-lg-3 col-md-6">
                    <div className="dashboard-card users-card">
                        <div>
                            <p>Total Users</p>
                            <h2>{dashboard.users}</h2>
                        </div>
                        <span>👥</span>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="dashboard-card food-card">
                        <div>
                            <p>Total Foods</p>
                            <h2>{dashboard.foods}</h2>
                        </div>
                        <span>🍔</span>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="dashboard-card order-card">
                        <div>
                            <p>Total Orders</p>
                            <h2>{dashboard.orders}</h2>
                        </div>
                        <span>📦</span>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="dashboard-card revenue-card">
                        <div>
                            <p>Total Revenue</p>
                            <h2>₹ {dashboard.revenue}</h2>
                        </div>
                        <span>💰</span>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;