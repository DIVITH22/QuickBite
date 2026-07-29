const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");    

const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert user
                db.query(
                    "INSERT INTO users(name,email,password,phone) VALUES(?,?,?,?)",
                    [name, email, hashedPassword, phone],
                    (err, result) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            message: "User Registered Successfully"
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }
};

const login = (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(400).json({
                    message: "Invalid Email"
                });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid mail / Password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                "quickbite_secret_key",
                {
                    expiresIn: "1d"
                }
            );

            res.json({
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        }
    );

};

module.exports = {
    register,
    login
};