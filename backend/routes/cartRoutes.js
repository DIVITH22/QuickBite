const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addToCart,
    getCartItems,
    removeCartItem,
    updateQuantity
} = require("../controllers/cartController");

// Get Logged-in User Cart
router.get("/", verifyToken, getCartItems);

// Add Item to Cart
router.post("/add", verifyToken, addToCart);

router.delete("/:cartId", verifyToken, removeCartItem);

router.put("/:cartId", verifyToken, updateQuantity);

module.exports = router;