const express = require("express");
const router = express.Router();


const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
    getOrderDetails
} = require("../controllers/orderController");

router.post("/place", verifyToken, placeOrder);

// Get Logged-in User Orders
router.get("/myorders", verifyToken, getMyOrders);

router.get("/all", verifyToken, isAdmin, getAllOrders);

router.put("/status/:id", verifyToken, isAdmin, updateOrderStatus);

router.get("/:id", verifyToken, getOrderDetails);   

router.put("/cancel/:id", verifyToken, cancelOrder);

module.exports = router;