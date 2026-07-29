import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Cart() {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await api.get("/cart");
      setCart(response.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

const handleRemove = async (cartId) => {

    try {

        await api.delete(`/cart/${cartId}`);

        alert("🗑 Item removed successfully.");

        loadCart(); // Reload cart items

    } catch (error) {

        alert("Failed to remove item.");

    }

};


// 👇 Add it here
const updateQuantity = async (cartId, quantity) => {

    if (quantity < 1) return;

    try {

        await api.put(`/cart/${cartId}`, {
            quantity
        });

        loadCart();

    } catch (error) {

        console.log(error);

    }

};


  return (
<div className="page-content">
<div className="container py-5">

    <h2 className="fw-bold mb-4">
        🛒 My Cart
    </h2>

    {cart.length === 0 ? (

        <div className="text-center mt-5">

            <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                width="180"
                alt="Empty Cart"
            />

            <h3 className="mt-4">Your Cart is Empty</h3>

            <p className="text-muted">
                Add some delicious food to continue.
            </p>

        </div>

    ) : (

<div className="row">

<div className="col-lg-8">

{cart.map(item => (

<div
key={item.id}
className="card border-0 shadow-sm mb-4 rounded-4"
>

<div className="card-body">

<div className="row align-items-center">

<div className="col-md-2 text-center">

    <img
    src={
        item.image.startsWith("http")
            ? item.image
            : item.image.startsWith("/")
                ? item.image
                : `/${item.image}`
    }
    alt={item.name}
    className="img-fluid rounded-4 shadow"
    style={{
        width: "110px",
        height: "110px",
        objectFit: "cover",
        borderRadius: "15px"
    }}
/>

</div>

<div className="col-md-4">

<div className="d-flex justify-content-between align-items-start">

<div>

<h4 className="fw-bold mb-2">
{item.name}
</h4>

<p className="text-muted">
Fresh & Delicious
</p>

</div>

<button
    className="btn btn-outline-danger rounded-pill btn-sm"
    onClick={() => handleRemove(item.id)}
>
    <i className="bi bi-trash3-fill me-1"></i>
    Remove
</button>

</div>

</div>

<div className="col-md-6">

<h4 className="text-success fw-bold mb-3">
₹ {item.price}
</h4>

<p className="text-muted mb-2 fw-semibold">
Quantity
</p>

<div className="d-flex align-items-center">

<button
    className="btn btn-outline-secondary rounded-circle"
    onClick={() =>
        updateQuantity(item.id, item.quantity - 1)
    }
>
-
</button>

<span
    className="mx-4 fw-bold fs-5"
>
    {item.quantity}
</span>

<button
    className="btn btn-warning rounded-circle text-white"
    onClick={() =>
        updateQuantity(item.id, item.quantity + 1)
    }
>
+
</button>

</div>

</div>



</div>

</div>

</div>

))}

</div>

<div className="col-lg-4">

<div className="card shadow-lg border-0 rounded-4">

<div className="card-body p-4">

<h4 className="fw-bold mb-4">
Order Summary
</h4>

<div className="d-flex justify-content-between mb-3">

<span>Total Items</span>

<span>
{cart.length}
</span>

</div>

<div className="d-flex justify-content-between mb-3">

<span>Delivery</span>

<span className="text-success">
FREE
</span>

</div>

<hr/>

<div className="d-flex justify-content-between">

<h4>Total</h4>

<h3 className="text-success">
₹ {total.toFixed(2)}
</h3>

</div>

<button
  className="btn btn-warning w-100 mt-4 rounded-pill py-3 fw-bold shadow"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout →
</button>

</div>

</div>

</div>

</div>

)}

</div>
</div>
);
}

export default Cart;