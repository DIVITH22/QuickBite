const db = require("../config/db");

// Add Item to Cart
const addToCart = (req, res) => {

    const { foodId, quantity } = req.body;
    const user_id = req.user.id;

    const sql = `
        INSERT INTO cart (user_id, food_id, quantity)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, foodId, quantity],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Item Added To Cart"
            });

        }
    );
};

// Get Cart Items
const getCartItems = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT
            cart.id,
            foods.name,
            foods.price,
            foods.image,
            cart.quantity
        FROM cart
        JOIN foods
        ON cart.food_id = foods.id
        WHERE cart.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Cart Retrieved Successfully",
            cart: result
        });

    });

};

const removeCartItem = (req, res) => {

    const { cartId } = req.params;
    const userId = req.user.id;

    const sql = `
        DELETE FROM cart
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [cartId, userId], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to remove item."
            });
        }

        res.json({
            message: "Item removed successfully."
        });

    });

};

const updateQuantity = (req, res) => {

    const { cartId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    const sql = `
        UPDATE cart
        SET quantity = ?
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [quantity, cartId, userId], (err) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to update quantity."
            });
        }

        res.json({
            message: "Quantity updated successfully."
        });

    });

};

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem,
    updateQuantity

};

