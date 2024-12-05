const db = require('../data/dbInit');

exports.postCart = (req, res) => {
    const cartItems = req.body.cartitems

    let promises = []

    try {

        cartItems.forEach((item) => {
            const query = `
            SELECT * FROM Product
            WHERE id = ?;
        `
            const promise = new Promise((resolve, reject) => {
                db.all(query, [item.id], (err, rows) => {
                    if (err)
                        reject(err)
                    else {
                        resolve(rows[0])
                    }
                })
            })
            promises.push(promise)
        });

        Promise.all(promises).then((value) => {
            res.status(200).json(value)
        }, (err) => {
            console.log("zle")
            res.status(400).json({ message: "something went wrong..." })
        })
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Internal server error." });
    }
}