import api from "../services/api";
import "../styles/FoodCard.css";
import { useEffect, useState } from "react";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} from "../services/wishlistService";

function FoodCard({ food }) {

  const [isWishlisted, setIsWishlisted] = useState(false);

  const addToCart = async () => {

    try {

      await api.post("/cart/add", {
        foodId: food.id,
        quantity: 1
      });

      alert("✅ Item added to cart");

    } catch (error) {

      alert(error.response?.data?.message || "Failed to add item");

    }

  };

   // 👇 Add this function here
    const loadWishlist = async () => {

        try {

            const response = await getWishlist();

            const exists = response.data.some(
                item => item.food_id === food.id
            );

            setIsWishlisted(exists);

        } catch (error) {

            console.log(error);

        }

    };

    // 👇 Add this useEffect here

  useEffect(() => {

      loadWishlist();

  }, [food.id]);

    // 👇 Add this function here
    const toggleWishlist = async () => {

        try {

            if (isWishlisted) {

                await removeFromWishlist(food.id);

                setIsWishlisted(false);

            } else {

                await addToWishlist(food.id);

                setIsWishlisted(true);

            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Wishlist failed."
            );

        }

    };

    


return (
  <div className="col-lg-4 col-md-6 mb-4">

    <div className="card food-card border-0 shadow-sm h-100">

      <div className="position-relative overflow-hidden">

        <img
          src={food.image || "/food-placeholder.jpg"}
          className="card-img-top food-image"
          alt={food.name}
        />

        <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">

            <button
                className="wishlist-btn"
                onClick={toggleWishlist}
            >
                <i
                    className={
                        isWishlisted
                            ? "bi bi-heart-fill text-danger"
                            : "bi bi-heart"
                    }
                ></i>
            </button>

            <span className="rating-badge">
                ⭐ 4.8
            </span>

        </div>

      </div>

      <div className="card-body">

        <h4 className="fw-bold">
          {food.name}
        </h4>

        <p className="text-muted mb-3">
          {food.description}
        </p>

        <div className="d-flex justify-content-between align-items-center mb-3">

          <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
            🍔 {food.category}
          </span>

          <h3 className="text-danger fw-bold m-0">
            ₹{food.price}
          </h3>

        </div>

        <div className="d-flex justify-content-between">

          <span
            className={`badge rounded-pill ${
              Number(food.available) === 1
                ? "bg-success"
                : "bg-danger"
            }`}
          >
            {Number(food.available) === 1
              ? "🟢 Available"
              : "🔴 Out of Stock"}
          </span>

          <small className="text-muted">
            🚚 25-30 mins
          </small>

        </div>

      </div>

      <div className="card-footer bg-white border-0">

        <button
          className="btn premium-btn w-100"
          disabled={Number(food.available) !== 1}
          onClick={addToCart}
        >
          {Number(food.available) === 1
            ? "🛒 Add To Cart"
            : "Out of Stock"}
        </button>

      </div>

    </div>

  </div>
);
}

export default FoodCard;