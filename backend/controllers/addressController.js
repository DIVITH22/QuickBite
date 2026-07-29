const db = require("../config/db");

// Add Address
const addAddress = (req, res) => {

    const userId = req.user.id;

    const {
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
        addressType
    } = req.body;

    const sql = `
        INSERT INTO addresses
        (
            user_id,
            full_name,
            phone,
            address,
            city,
            state,
            pincode,
            address_type
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            fullName,
            phone,
            address,
            city,
            state,
            pincode,
            addressType
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Address Added Successfully"
            });

        }
    );

};

// Get My Addresses
const getMyAddresses = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT *
        FROM addresses
        WHERE user_id = ?
        ORDER BY is_default DESC, created_at DESC
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};
// Update Address
const updateAddress = (req, res) => {

    const userId = req.user.id;
    const { id } = req.params;

    const {
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
        addressType
    } = req.body;

    const sql = `
        UPDATE addresses
        SET
            full_name = ?,
            phone = ?,
            address = ?,
            city = ?,
            state = ?,
            pincode = ?,
            address_type = ?
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(
        sql,
        [
            fullName,
            phone,
            address,
            city,
            state,
            pincode,
            addressType,
            id,
            userId
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Address not found"
                });
            }

            res.json({
                message: "Address Updated Successfully"
            });

        }
    );

};

// Delete Address
const deleteAddress = (req, res) => {

    const userId = req.user.id;
    const { id } = req.params;

    const sql = `
        DELETE FROM addresses
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [id, userId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        res.json({
            message: "Address Deleted Successfully"
        });

    });

};

module.exports = {
    addAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress
};