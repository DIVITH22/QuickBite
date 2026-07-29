import "./../styles/Checkout.css";

import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";



function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryType, setDeliveryType] = useState("standard");
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "Home"
});

useEffect(() => {
    loadCart();
    loadAddresses();
}, []);

  const loadCart = async () => {
    try {
      const response = await api.get("/cart");
      setCart(response.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

const loadAddresses = async () => {

    try {

        const response = await api.get("/address");

        console.log(response.data);

        setAddresses(response.data);

        if (response.data.length > 0) {
            setSelectedAddress(response.data[0]);
        }

    } catch (error) {

        console.log(error);

    }

};

const handleEditAddress = (address) => {

    setEditingId(address.id);

    setFormData({
        fullName: address.full_name,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        addressType: address.address_type
    });

    setShowAddressModal(false);

    setShowAddModal(true);

};

const handleDeleteAddress = async (id) => {

    if (!window.confirm("Delete this address?")) {
        return;
    }

    try {

        await api.delete(`/address/${id}`);

        alert("Address deleted successfully.");

        loadAddresses();

    } catch (error) {

        console.log(error);

        alert("Failed to delete address.");

    }

};

const handleSaveAddress = async () => {

    try {

        if (
            !formData.fullName ||
            !formData.phone ||
            !formData.address ||
            !formData.city ||
            !formData.state ||
            !formData.pincode
        ) {
            alert("Please fill all fields.");
            return;
        }

        const payload = {
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            addressType: formData.addressType
        };

        if (editingId) {

            await api.put(`/address/${editingId}`, payload);

            // alert("Address updated successfully.");

        } else {

            await api.post("/address", payload);

            alert("Address added successfully.");

        }

        setShowAddModal(false);

        setEditingId(null);

        setFormData({
            fullName: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            addressType: "Home"
        });

        loadAddresses();

    } catch (error) {

    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    alert(
        error.response?.data?.message ||
        JSON.stringify(error.response?.data) ||
        error.message
    );

}

};

 const handlePlaceOrder = async () => {

    if (!selectedAddress) {
        alert("Please select a delivery address.");
        return;
    }

    try {

        const response = await api.post("/orders/place", {

            fullName: selectedAddress.full_name,
            phone: selectedAddress.phone,
            address: selectedAddress.address,
            city: selectedAddress.city,
            state: selectedAddress.state,
            pincode: selectedAddress.pincode,

            paymentMethod,
            deliveryType

        });

        alert(response.data.message);

        navigate("/myorders");

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Failed to place order."
        );

    }

};

const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
);

const deliveryCharge =
    deliveryType === "standard" ? 0 : 99;

const discount = 100;

const total =
    subtotal + deliveryCharge - discount;

  return (
<div className="page-content checkout-page">

<div className="container">

<h1 className="checkout-title">
Checkout
</h1>

<div className="row g-4">

<div className="col-lg-8">

{/* Address */}

<div className="checkout-card">

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h3 className="mb-1">📍 Delivery Address</h3>

            <p className="text-muted mb-0">
                Please enter your delivery details
            </p>

        </div>

        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
            Home
        </span>

    </div>

    {
    selectedAddress ? (

        <div className="card border-0 bg-light rounded-4 p-4">

            <div className="d-flex justify-content-between align-items-start">

                <div>

                    <h5 className="fw-bold">
                        🏠 {selectedAddress.address_type}
                    </h5>

                    <p className="mb-1">
                        <strong>{selectedAddress.full_name}</strong>
                    </p>

                    <p className="mb-1">
                        {selectedAddress.phone}
                    </p>

                    <p className="mb-1">
                        {selectedAddress.address}
                    </p>

                    <p className="mb-0">
                        {selectedAddress.city},
                        {" "}
                        {selectedAddress.state}
                        {" - "}
                        {selectedAddress.pincode}
                    </p>

                </div>

            </div>

            <div className="mt-4">

                <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => setShowAddressModal(true)}
                >
                    Change Address
                </button>

                <button
                className="btn btn-success"
                onClick={() => {

                    setEditingId(null);

                    setFormData({
                        fullName: "",
                        phone: "",
                        address: "",
                        city: "",
                        state: "",
                        pincode: "",
                        addressType: "Home"
                    });

                    setShowAddModal(true);

                }}
            >
                + Add New Address
            </button>

            </div>

        </div>

    ) : (

        <div className="text-center py-5">

            <h5>No saved address</h5>

        <button
            className="btn btn-success mt-3"
            onClick={() => setShowAddModal(true)}
        >
            + Add Address
        </button>

        </div>

    )
}
    


</div>

{/* Payment */}

<div className="checkout-card">

    <div className="mb-4">

        <h3 className="mb-1">💳 Payment Method</h3>

        <p className="text-muted">
            Select your preferred payment option
        </p>

    </div>

    <div className="row g-3">

        {/* Cash */}

        <div className="col-md-4">

            <div
                className={`payment-card ${
                    paymentMethod === "cod"
                        ? "payment-active"
                        : ""
                }`}
                onClick={() => setPaymentMethod("cod")}
            >

                <div className="payment-icon">
                    💵
                </div>

                <h5>Cash</h5>

                <small className="text-muted">
                    Cash on Delivery
                </small>

            </div>

        </div>

        {/* UPI */}

        <div className="col-md-4">

            <div
                className={`payment-card ${
                    paymentMethod === "upi"
                        ? "payment-active"
                        : ""
                }`}
                onClick={() => setPaymentMethod("upi")}
            >

                <div className="payment-icon">
                    📱
                </div>

                <h5>UPI</h5>

                <small className="text-muted">
                    Google Pay / PhonePe
                </small>

            </div>

        </div>

        {/* Card */}

        <div className="col-md-4">

            <div
                className={`payment-card ${
                    paymentMethod === "card"
                        ? "payment-active"
                        : ""
                }`}
                onClick={() => setPaymentMethod("card")}
            >

                <div className="payment-icon">
                    💳
                </div>

                <h5>Card</h5>

                <small className="text-muted">
                    Visa / MasterCard
                </small>

            </div>

        </div>

    </div>

</div>

{/* Delivery */}

<div className="checkout-card">

    <div className="mb-4">

        <h3 className="mb-1">🚚 Delivery Options</h3>

        <p className="text-muted">
            Choose your preferred delivery speed
        </p>

    </div>

    <div className="row g-3">

        {/* Standard Delivery */}

        <div className="col-md-6">

            <div
                className={`delivery-card ${
                    deliveryType === "standard"
                        ? "delivery-active"
                        : ""
                }`}
                onClick={() => setDeliveryType("standard")}
            >

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h5 className="mb-1">
                            🚚 Standard Delivery
                        </h5>

                        <small className="text-muted">
                            Delivery in 25–30 mins
                        </small>

                    </div>

                    <h5 className="text-success mb-0">
                        FREE
                    </h5>

                </div>

            </div>

        </div>

        {/* Express Delivery */}

        <div className="col-md-6">

            <div
                className={`delivery-card ${
                    deliveryType === "express"
                        ? "delivery-active"
                        : ""
                }`}
                onClick={() => setDeliveryType("express")}
            >

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h5 className="mb-1">
                            ⚡ Express Delivery
                        </h5>

                        <small className="text-muted">
                            Delivery in 10–15 mins
                        </small>

                    </div>

                    <h5 className="text-warning mb-0">
                        +₹99
                    </h5>

                </div>

            </div>

        </div>

    </div>

</div>

</div>

<div className="col-lg-4">

<div className="summary-card">

    <h3 className="fw-bold mb-4">
        🛍 Order Summary
    </h3>

    <div className="d-flex justify-content-between mb-3">
        <span>Items</span>
        <strong>{cart.length}</strong>
    </div>

    <div className="d-flex justify-content-between mb-3">
        <span>Subtotal</span>
        <strong>₹{subtotal.toFixed(2)}</strong>
    </div>

    <div className="d-flex justify-content-between mb-3">
        <span>Delivery</span>

        <strong>
            {deliveryType === "standard"
                ? "FREE"
                : "₹99"}
        </strong>
    </div>

    <div className="d-flex justify-content-between mb-3">
        <span>Discount</span>
        <span className="text-success">
            -₹100
        </span>
    </div>

    <hr />

    <div className="d-flex justify-content-between mb-4">

        <h4>Total</h4>

        <h3 className="text-success">
            ₹{total.toFixed(2)}
        </h3>

    </div>

    <div className="alert alert-success rounded-4">

        🚚 Estimated Delivery

        <br />

        <strong>25–30 Minutes</strong>

    </div>

    <button
        className="place-order-btn w-100"
        onClick={handlePlaceOrder}
    >
        Place Order →
    </button>

</div>

</div>

</div>

</div>

                {
showAddressModal && (

<div
    className="modal d-block"
    style={{ background: "rgba(0,0,0,.5)" }}
>

<div className="modal-dialog modal-lg">

<div className="modal-content">

<div className="modal-header">

<h5>Select Delivery Address</h5>

<button
className="btn-close"
onClick={() => setShowAddressModal(false)}
></button>

</div>

<div className="modal-body">

{
    addresses.map((item) => (

        <div
            key={item.id}
            className={`card mb-3 p-3 ${
                selectedAddress?.id === item.id
                    ? "border-primary"
                    : ""
            }`}
        >

            <div className="form-check">

                <input
                    className="form-check-input"
                    type="radio"
                    checked={selectedAddress?.id === item.id}
                    onChange={() => setSelectedAddress(item)}
                />

                <label className="form-check-label w-100">

                    <h5>🏠 {item.address_type}</h5>

                    <p><strong>{item.full_name}</strong></p>

                    <p>{item.phone}</p>

                    <p>
                        {item.address}
                        <br />
                        {item.city}, {item.state} - {item.pincode}
                    </p>

                </label>

            </div>

            <div className="mt-2">

                <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditAddress(item)}
                >
                    ✏ Edit
                </button>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteAddress(item.id)}
                    
                >
                    🗑 Delete
                </button>

            </div>

        </div>

    ))
}

</div>

</div>

</div>

</div>

)
}

{
showAddModal && (

<div
    className="modal d-block"
    style={{ background: "rgba(0,0,0,.5)" }}
>

<div className="modal-dialog">

<div className="modal-content">

<div className="modal-header">

<h5>
    {editingId ? "Edit Address" : "Add New Address"}
</h5>

<button
    className="btn-close"
    onClick={() => {
        setShowAddModal(false);
        setEditingId(null);
    }}
></button>

</div>

<div className="modal-body">

<div className="mb-3">

<label>Full Name</label>

<input
    className="form-control"
    value={formData.fullName}
    onChange={(e) =>
        setFormData({
            ...formData,
            fullName: e.target.value
        })
    }
/>

</div>

<div className="mb-3">

<label>Phone</label>

<input
    className="form-control"
    value={formData.phone}
    onChange={(e) =>
        setFormData({
            ...formData,
            phone: e.target.value
        })
    }
/>

</div>

<div className="mb-3">

<label>Address</label>

<textarea
    className="form-control"
    rows="3"
    value={formData.address}
    onChange={(e) =>
        setFormData({
            ...formData,
            address: e.target.value
        })
    }
/>

</div>

<div className="mb-3">

<label>City</label>

<input
    className="form-control"
    value={formData.city}
    onChange={(e) =>
        setFormData({
            ...formData,
            city: e.target.value
        })
    }
/>

</div>

<div className="mb-3">

<label>State</label>

<input
    className="form-control"
    value={formData.state}
    onChange={(e) =>
        setFormData({
            ...formData,
            state: e.target.value
        })
    }
/>

</div>

<div className="mb-3">

<label>Pincode</label>

<input
    className="form-control"
    value={formData.pincode}
    onChange={(e) =>
        setFormData({
            ...formData,
            pincode: e.target.value
        })
    }
/>

</div>

<div className="mb-3">

<label>Address Type</label>

<select
    className="form-select"
    value={formData.addressType}
    onChange={(e) =>
        setFormData({
            ...formData,
            addressType: e.target.value
        })
    }
>

<option value="Home">Home</option>
<option value="Office">Office</option>
<option value="Other">Other</option>

</select>

</div>

</div>

<div className="modal-footer">

<button
    className="btn btn-secondary"
    onClick={() => {
        setShowAddModal(false);
        setEditingId(null);
    }}
>
    Cancel
</button>

<button
    className="btn btn-success"
    onClick={handleSaveAddress}
>
    {editingId ? "Update Address" : "Save Address"}
</button>

</div>

</div>

</div>

</div>

)
}

</div>
);
}

export default Checkout;