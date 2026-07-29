const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress
} = require("../controllers/addressController");

router.post("/", verifyToken, addAddress);
router.get("/", verifyToken, getMyAddresses);
router.put("/:id", verifyToken, updateAddress);
router.delete("/:id", verifyToken, deleteAddress);

module.exports = router;