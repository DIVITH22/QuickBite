const express = require("express");
const router = express.Router();

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} = require("../controllers/wishlistController");

const verifyToken = require("../middleware/authMiddleware");

// Add to Wishlist
router.post("/", verifyToken, addToWishlist);

// Get Wishlist
router.get("/", verifyToken, getWishlist);

// Remove from Wishlist
router.delete("/:foodId", verifyToken, removeFromWishlist);

module.exports = router;