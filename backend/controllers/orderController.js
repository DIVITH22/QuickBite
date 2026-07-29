const db = require("../config/db");

// Place Order
const placeOrder = (req, res) => {

    const user_id = req.user.id;
    const {
    fullName,
    phone,
    address,
    city,
    state,
    pincode,
    paymentMethod,
    deliveryType
} = req.body;

    // Get user's cart items
    const cartSql = `
        SELECT
            cart.food_id,
            cart.quantity,
            foods.price
        FROM cart
        INNER JOIN foods
        ON cart.food_id = foods.id
        WHERE cart.user_id = ?
    `;

    db.query(cartSql, [user_id], (err, cartItems) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart is Empty"
            });
        }

        let totalAmount = 0;

        cartItems.forEach(item => {
            totalAmount += Number(item.price) * item.quantity;
        });

        const orderSql = `
            INSERT INTO orders
            (
                user_id,
                total_amount,
                status,
                full_name,
                phone,
                address,
                city,
                state,
                pincode,
                payment_method,
                delivery_type
            )
            VALUES (?, ?, 'Pending', ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
        orderSql,
        [
            user_id,
            totalAmount,
            fullName,
            phone,
            address,
            city,
            state,
            pincode,
            paymentMethod,
            deliveryType
        ],
        (err, orderResult) => {

            if (err) {
                return res.status(500).json(err);
            }

            const orderId = orderResult.insertId;

            const orderItems = cartItems.map(item => [
                orderId,
                item.food_id,
                item.quantity,
                item.price
            ]);

            const orderItemSql = `
                INSERT INTO order_items
                (order_id, food_id, quantity, price)
                VALUES ?
            `;

            db.query(orderItemSql, [orderItems], (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                db.query(
                    "DELETE FROM cart WHERE user_id = ?",
                    [user_id],
                    (err) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            message: "Order Placed Successfully",
                            orderId: orderId,
                            totalAmount: totalAmount
                        });

                    }
                );

            });

        });

    });

};

// Get Logged-in User Orders
const getMyOrders = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT *
        FROM orders
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [user_id], (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(results);

    });

};

// Get All Orders (Admin)
const getAllOrders = (req, res) => {

    const sql = `
        SELECT
            orders.id,
            users.name,
            users.email,
            orders.total_amount,
            orders.status,
            orders.created_at
        FROM orders
        INNER JOIN users
        ON orders.user_id = users.id
        ORDER BY orders.created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(results);

    });

};

// Update Order Status
const updateOrderStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const sql = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        res.json({
            message: "Order Status Updated Successfully"
        });

    });

};

// Cancel Order
const cancelOrder = (req, res) => {

    const { id } = req.params;

    const sql = `
        UPDATE orders
        SET status = 'Cancelled'
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        res.json({
            message: "Order Cancelled Successfully"
        });

    });

};

const getOrderDetails = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            oi.food_id,
            f.name,
            f.image,
            oi.quantity,
            oi.price
        FROM order_items oi
        INNER JOIN foods f
        ON oi.food_id = f.id
        WHERE oi.order_id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
    getOrderDetails
};