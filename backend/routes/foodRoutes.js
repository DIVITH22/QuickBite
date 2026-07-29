const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
    addFood,
    getAllFoods,
    getFoodById,
    updateFood,
    deleteFood
} = require("../controllers/foodController");

// Public Routes
router.get("/all", getAllFoods);
router.get("/:id", getFoodById);

// Admin Only Routes
router.post("/add", verifyToken, isAdmin, addFood);

router.put("/update/:id", verifyToken, isAdmin, updateFood);

router.delete("/delete/:id", verifyToken, isAdmin, deleteFood);

module.exports = router;