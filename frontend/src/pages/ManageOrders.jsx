import { useEffect, useState } from "react";
import api from "../services/api";

function ManageOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await api.get("/orders/all");
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (id, status) => {

        try {

            await api.put(`/orders/status/${id}`, {
                status: status
            });

            alert("Order Updated Successfully");

            loadOrders();

        } catch (error) {

            alert(error.response?.data?.message || "Update Failed");

        }

    };

    return (

        <div className="page-content">

        <div className="container mt-4">

            <h2>📦 Manage Orders</h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {orders.map(order => (

                        <tr key={order.id}>

                            <td>{order.id}</td>

                            <td>{order.name}</td>

                            <td>{order.email}</td>

                            <td>₹ {order.total_amount}</td>

                            <td>
                                <span className="badge bg-primary">
                                    {order.status}
                                </span>
                            </td>

                            <td>

                                <select
                                    className="form-select"
                                    defaultValue={order.status}
                                    onChange={(e) =>
                                        updateStatus(order.id, e.target.value)
                                    }
                                >

                                    <option>Pending</option>
                                    <option>Preparing</option>
                                    <option>Out For Delivery</option>
                                    <option>Delivered</option>
                                    <option>Cancelled</option>

                                </select>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
        </div>

    );

}

export default ManageOrders;