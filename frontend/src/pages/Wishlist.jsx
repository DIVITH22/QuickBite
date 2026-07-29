import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    getWishlist,
    removeFromWishlist
} from "../services/wishlistService";
import "../styles/Wishlist.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();   

    const loadWishlist = async () => {

    try {

        const response = await getWishlist();

        setWishlist(response.data);

    } catch (error) {

        console.log(error);

    }

};

useEffect(() => {

    loadWishlist();

}, []);


const handleRemove = async (foodId) => {

    try {

        await removeFromWishlist(foodId);

        loadWishlist();

    } catch (error) {

        alert("Failed to remove item.");

    }

};

const handleAddToCart = async (foodId) => {

    try {

        await api.post("/cart/add", {
            foodId,
            quantity: 1
        });

        alert("✅ Item added to cart.");

    } catch (error) {

    console.log(error.response);

    alert(
        JSON.stringify(error.response?.data) ||
        error.message
    );

}

};

const handleBuyNow = async (foodId) => {

    try {

        await api.post("/cart/add", {
            foodId,
            quantity: 1
        });

        // alert("✅ Item added to cart.");
        navigate("/checkout");

    } catch (error) {

    console.log(error.response);

    alert(
        JSON.stringify(error.response?.data) ||
        error.message
    );

}

};

    return (
        <div className="page-content">
        <div className="wishlist-page">

            <div className="container">

                <div className="wishlist-header">
                    <div>
                        <h2>
                            <i className="bi bi-heart-fill text-danger me-2"></i>
                            My Wishlist
                        </h2>
                        <p>
                            Save your favorite dishes and order them anytime.
                        </p>
                    </div>
                </div>

                {wishlist.length === 0 ? (

                    <div className="wishlist-empty">

                        <div className="wishlist-icon">
                            <i className="bi bi-heart"></i>
                        </div>

                        <h3>Your Wishlist is Empty</h3>

                        <p>
                            You haven't added any favorite dishes yet.
                            Explore our delicious menu and save your favorites.
                        </p>

                        <Link to="/#menu" className="browse-btn">
                            <i className="bi bi-grid-fill me-2"></i>
                            Browse Menu
                        </Link>

                    </div>

                ) : (

                    <div className="row">

                        {wishlist.map(item => (

                            <div className="col-md-4 mb-4" key={item.food_id}>

                                <div className="card food-card border-0 shadow-sm h-100">

                                    <div className="position-relative overflow-hidden">

                                    <img
                                        src={item.image || "/food-placeholder.jpg"}
                                        className="card-img-top food-image"
                                        alt={item.name}
                                    />

                                    <div className="position-absolute top-0 end-0 m-3">

                                        <span className="rating-badge">
                                            ⭐ 4.8
                                        </span>

                                    </div>

                                </div>

                                <div className="card-body">

                                    <h4 className="fw-bold">
                                        {item.name}
                                    </h4>

                                    <p className="text-muted mb-3">
                                        {item.description}
                                    </p>

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
                                            🍔 {item.category}
                                        </span>

                                        <h3 className="text-danger fw-bold m-0">
                                            ₹{item.price}
                                        </h3>

                                    </div>

                                </div>

                                <div className="card-footer bg-white border-0">

                                    <button
                                        className="btn premium-btn w-100 mb-2"
                                        onClick={() => handleAddToCart(item.food_id)}
                                    >
                                        🛒 Add To Cart
                                    </button>

                                    <div className="d-flex gap-2">

                                        <button
                                            className="btn btn-success flex-fill"
                                            onClick={() => handleBuyNow(item.food_id)}
                                        >
                                            ⚡ Buy Now
                                        </button>

                                        <button
                                            className="btn btn-outline-danger flex-fill"
                                            onClick={() => handleRemove(item.food_id)}
                                        >
                                            🗑 Remove
                                        </button>

                                    </div>

                                </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

        </div>
    );
}

export default Wishlist;