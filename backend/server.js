const express = require("express");
const cors = require("cors");
const db = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();

const addressRoutes = require("./routes/addressRoutes");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/address", addressRoutes);

app.get("/", (req, res) => {
    res.send("QuickBite Backend Running...");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

