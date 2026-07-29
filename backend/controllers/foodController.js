const db = require("../config/db");

// ======================
// Add Food
// ======================
const addFood = (req, res) => {

    const {
        name,
        description,
        category,
        price,
        available,
        image
    } = req.body;

    const sql = `
        INSERT INTO foods
        (name, description, category, price, available, image)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, description, category, price, available, image],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Food Added Successfully"
            });

        }
    );

};

// ======================
// Get All Foods
// ======================
const getAllFoods = (req, res) => {

    const sql = "SELECT * FROM foods";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json({
            message: "Foods Retrieved Successfully",
            foods: result
        });

    });

};

// ======================
// Get Food By ID
// ======================
const getFoodById = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM foods WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Food Not Found"
            });
        }

        res.status(200).json({
            message: "Food Retrieved Successfully",
            food: result[0]
        });

    });

};

// ======================
// Update Food
// ======================
const updateFood = (req, res) => {

    const { id } = req.params;

    const {
        name,
        description,
        category,
        price,
        available,
        image
    } = req.body;

    const sql = `
        UPDATE foods
        SET
            name = ?,
            description = ?,
            category = ?,
            price = ?,
            available = ?,
            image = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            name,
            description,
            category,
            price,
            available,
            image,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Food Not Found"
                });
            }

            res.status(200).json({
                message: "Food Updated Successfully"
            });

        }
    );

};

// ======================
// Delete Food
// ======================
const deleteFood = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM foods WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Food Not Found"
                });
            }

            res.status(200).json({
                message: "Food Deleted Successfully"
            });

        }
    );

};

module.exports = {
    addFood,
    getAllFoods,
    getFoodById,
    updateFood,
    deleteFood
};