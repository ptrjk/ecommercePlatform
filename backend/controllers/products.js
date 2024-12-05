const db = require('../data/dbInit');

exports.postCreateProduct = (req, res) => {
    const { title, desc, price, category } = req.body;
    const file = req.file.filename;

    const query = `
        INSERT INTO
        Product(category, title, description, price, pictureUrl)
        VALUES (?, ?, ?, ?, ?);
    `;
    db.run(query, [category, title, desc, price, file], (err) => {
        if (err) {
            console.log(err);
            res.status(400).json({ message: "Something went wrong..." });
            return;
        };
    });
    res.status(200).json({ message: "Product created successfully", ok: true });
}

exports.getProducts = (req, res) => {
    const category = req.params.category
    console.log(category)
    try {
        if (category === 'all') {
            const query = `
        SELECT * FROM Product;
        `;
            db.all(query, [], (err, rows) => {
                if (err) {
                    console.log("something went wrong...");
                    return res.status(400).json({ products: [] });
                }
                return res.status(200).json({ products: rows });
            });
        } else {
            const query = `
        SELECT * FROM Product
        WHERE category = ?;
        `;
            db.all(query, [category], (err, rows) => {
                if (err) {
                    console.log("something went wrong...");
                    return res.status(400).json({ products: [] });
                }
                return res.status(200).json({ products: rows });
            });
        }
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Internal server error." });
    }
}

exports.deleteProduct = (req, res) => {
    const id = req.params.productId;


    let querry = `
    DELETE FROM Product WHERE id= ?;
    `
    try {
        db.run(querry, [id], (err) => {
            if (err) {
                console.log("error " + err);
                res.status(400).json({ error: "error" });
            }
            else {
                console.log("deleted");
                res.status(200).json({ error: "none" });
            }
        });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Internal server error." });
    }
}