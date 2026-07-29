const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
    getDashboard
} = require("../controllers/dashboardController");

router.get("/", verifyToken, isAdmin, getDashboard);

module.exports = router;