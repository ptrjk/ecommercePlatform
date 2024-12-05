const db = require('../data/dbInit');
const crypto = require('crypto');


exports.getOrders = (req, res) => {
    const querry = `
        SELECT * FROM Orders;
    `;

    try {
        db.all(querry, [], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(400).json({ message: "error" });
            }
            res.status(200).json({ orders: rows });
        })
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Internal server error." });
    }
}

exports.postOrder = (req, res) => {
    const { name, email, address, phone, price, cart } = req.body;
    const uniqueId = crypto.randomBytes(16).toString('hex');

    const date = new Date();

    let query = `
        INSERT INTO
        Orders(id,address, date, email, phoneNumber, orderStatus, userName, price)
        VALUES (?,?,?,?,?,?,?,?);
    `
    try {
        db.run(query, [uniqueId, address, date, email, phone, 1, name, price], (err) => {
            if (err) {
                console.log("error:" + err);
                res.status(400).json({ message: "something went wrong.." });
            } else {
                query = `
            INSERT INTO
            cartProduct(orderId, productId, quantity)
            VALUES (?,?,?);
            `;

                for (let cartItem of cart) {
                    db.run(query, [uniqueId, cartItem.id, cartItem.quantity], (err) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ message: "something went wrong.." });
                        } else {
                            console.log("inserted id " + cartItem.id);
                        }
                    });
                }
                res.status(200).json({ message: "ok" });
            }
        });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Internal server error." });
    }
}


exports.getOrderDetails = (req, res) => {
    const { orderId } = req.params;

    let query = `
        SELECT * FROM cartProduct
        WHERE orderId = ?;
    `;

    try {

        db.all(query, [orderId], (err, ProductOrderRows) => {
            if (err) {
                console.log("erorr: " + err);
                res.status(400).json({ message: "something went wrong.." });
            } else {
                const productPromises = ProductOrderRows.map((product) => {
                    return new Promise((resolve, reject) => {
                        query = `
                        SELECT * FROM Product
                        WHERE id = ?;
                    `;

                        db.all(query, [product.productId], (err, rows) => {
                            if (err || rows.length <= 0) {
                                console.log("err2 " + err);
                                reject(err);
                            }
                            resolve({ ...rows[0], quantity: product.quantity });
                        });
                    });
                });
                Promise.all(productPromises).then((results) => {
                    query =
                        `
                    SELECT * FROM Orders
                    WHERE id = ?;
                `;
                    db.all(query, [orderId], (err, order) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ message: "something went wrong.." });
                        } else {
                            res.status(200).json({
                                order: order[0],
                                products: results
                            });
                        }
                    });
                }).catch((error) => {
                    console.log("error: " + error);
                    res.status(400).json({ message: "something went wrong.." });
                });
            }
        });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Internal server error." });
    }
}

exports.postUpdateStatusOrder = (req, res) => {
    const { orderId } = req.params;

    const query = `
        UPDATE Orders
        SET orderStatus = ?
        WHERE id = ?;
    `
    try {
        db.run(query, [2, orderId], (err) => {
            if (err) {
                console.log(err)
                res.json({ message: "wrong" }).status(400)
            }

            else {
                console.log("ok")
                res.json({ message: "ok" }).status(200)
            }
        })
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Internal server error." });
    }
}