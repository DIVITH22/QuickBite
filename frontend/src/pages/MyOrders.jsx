import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/MyOrders.css";

function MyOrders() {

    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

const loadOrders = async () => {
    try {
        const response = await api.get("/orders/myorders");

        console.log("Orders Response:", response.data);

        setOrders(response.data);

    } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
        console.log(error);
    }
};

const handleCancelOrder = async (id) => {

    const confirmCancel = window.confirm(
        "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {

        const response = await api.put(`/orders/cancel/${id}`);

        alert(response.data.message);

        loadOrders();

    } catch (error) {

        console.log(error);

        alert("Unable to cancel order.");

    }

};

const handleViewDetails = async (id) => {

    try {

        const response = await api.get(`/orders/${id}`);

        setOrderDetails(response.data);

        setSelectedOrder(id);

    } catch (error) {

        console.log(error);

        alert("Unable to load order details.");

    }

};
    return (
        <div className="page-content">
        <div className="container mt-4">

            <h2>📦 My Orders</h2>

            {orders.length === 0 ? (

    <div className="text-center mt-5">
        <h3>📦 No Orders Yet</h3>
        <p className="text-muted">
            Start ordering your favorite food!
        </p>
    </div>

) : (

    <div className="row">

        {orders.map((order) => (

            <div className="col-lg-6 mb-4" key={order.id}>

                <div className="order-card">

                    <div className="d-flex justify-content-between align-items-center">

                        <h4 className="mb-0">
                            📦 Order #{order.id}
                        </h4>

                        <span
                            className={`badge ${
                                order.status === "Pending"
                                    ? "bg-warning text-dark"
                                    : order.status === "Delivered"
                                    ? "bg-success"
                                    : order.status === "Cancelled"
                                    ? "bg-danger"
                                    : "bg-primary"
                            }`}
                        >
                            {order.status}
                        </span>

                    </div>

                    <hr />

                    <div className="mb-2">

                        <strong>💰 Total Amount</strong>

                        <h3 className="text-success mt-1">
                            ₹{order.total_amount}
                        </h3>

                    </div>

                    <div className="mb-2">

                        <strong>📅 Ordered On</strong>

                        <p className="text-muted mb-0">
                            {new Date(order.created_at).toLocaleString()}
                        </p>

                    </div>

                    <div className="alert alert-light border mt-3">

                        🚚 Estimated Delivery

                        <br />

                        <strong>25–30 Minutes</strong>

                    </div>

                    <div className="d-flex gap-2">

                    <button
                        className="btn btn-outline-dark w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#orderModal"
                        onClick={() => handleViewDetails(order.id)}
                    >
                        View Details
                    </button>

                        {order.status === "Pending" && (

                        <button
                            className="btn btn-danger w-100"
                            onClick={() => handleCancelOrder(order.id)}
                        >
                            Cancel
                        </button>

                        )}

                    </div>

                </div>

            </div>

        ))}

    </div>

)}

        </div>

        <div
    className="modal fade"
    id="orderModal"
    tabIndex="-1"
    aria-hidden="true"
>
    <div className="modal-dialog modal-lg">

        <div className="modal-content">

            <div className="modal-header">

                <h4 className="modal-title">
                    📦 Order #{selectedOrder}
                </h4>

                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                ></button>

            </div>

            <div className="modal-body">

                {orderDetails.length === 0 ? (

                    <p className="text-center">
                        No Items Found
                    </p>

                ) : (

                    orderDetails.map((item, index) => (

                        <div
                            key={index}
                            className="d-flex align-items-center border rounded p-3 mb-3"
                        >

                            <img
                                src={item.image}
                                alt={item.name}
                                width="90"
                                height="90"
                                className="rounded"
                            />

                            <div className="ms-3 flex-grow-1">

                                <h5>{item.name}</h5>

                                <p className="mb-1">
                                    Quantity: {item.quantity}
                                </p>

                                <h6 className="text-success">
                                    ₹{item.price}
                                </h6>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    </div>
</div>
        </div>
    );
}

export default MyOrders;