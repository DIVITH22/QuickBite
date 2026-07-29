const db = require("../config/db");

const getDashboard = (req, res) => {

    const dashboard = {};

    db.query("SELECT COUNT(*) AS users FROM users", (err, users) => {

        if (err) return res.status(500).json(err);

        dashboard.users = users[0].users;

        db.query("SELECT COUNT(*) AS foods FROM foods", (err, foods) => {

            if (err) return res.status(500).json(err);

            dashboard.foods = foods[0].foods;

            db.query("SELECT COUNT(*) AS orders FROM orders", (err, orders) => {

                if (err) return res.status(500).json(err);

                dashboard.orders = orders[0].orders;

                db.query(
                    "SELECT IFNULL(SUM(total_amount),0) AS revenue FROM orders",
                    (err, revenue) => {

                        if (err) return res.status(500).json(err);

                        dashboard.revenue = revenue[0].revenue;

                        res.json(dashboard);

                    }
                );

            });

        });

    });

};

module.exports = {
    getDashboard
};