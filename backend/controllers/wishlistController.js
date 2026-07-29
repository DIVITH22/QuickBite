const db = require("../config/db");

// Add to Wishlist
exports.addToWishlist = (req, res) => {
    const userId = req.user.id;
    const { foodId } = req.body;

    const sql = `
        INSERT INTO wishlist (user_id, food_id)
        VALUES (?, ?)
    `;

    db.query(sql, [userId, foodId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to add to wishlist.",
                error: err
            });
        }

        res.status(201).json({
            message: "Added to wishlist successfully."
        });
    });
};

// Get Wishlist
exports.getWishlist = (req, res) => {
    const userId = req.user.id;

    const sql = `
        SELECT
            w.id,
            f.id AS food_id,
            f.name,
            f.price,
            f.image,
            f.category,
            f.description
        FROM wishlist w
        JOIN foods f
        ON w.food_id = f.id
        WHERE w.user_id = ?
        ORDER BY w.created_at DESC
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to fetch wishlist.",
                error: err
            });
        }

        res.json(result);
    });
};

// Remove from Wishlist
exports.removeFromWishlist = (req, res) => {
    const userId = req.user.id;
    const { foodId } = req.params;

    const sql = `
        DELETE FROM wishlist
        WHERE user_id = ?
        AND food_id = ?
    `;

    db.query(sql, [userId, foodId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to remove wishlist item.",
                error: err
            });
        }

        res.json({
            message: "Removed from wishlist."
        });
    });
};