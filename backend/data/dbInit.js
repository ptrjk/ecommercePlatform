const sql = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sql.Database('./data/database.db', sql.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("error db");
    } else {
        console.log("connected db");
    }
});

let query = `
    CREATE TABLE IF NOT EXISTS Orders (
    id VARCHAR(300) PRIMARY KEY,
    address VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(50) NOT NULL,
    orderStatus INT NOT NULL,
    price DOUBLE NOT NULL,
    userName VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    pictureUrl VARCHAR(200) NOT NULL,
    description VARCHAR(260) NOT NULL,
    price DOUBLE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cartProduct
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId VARCHAR(300) NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES Orders(id)
    FOREIGN KEY (productId) REFERENCES Product(id)
    );

    CREATE TABLE IF NOT EXISTS User
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(300) NOT NULL,
    password VARCHAR(300) NOT NULL
    );
    `;

db.exec(query, (err) => {
    console.log("exec..");
    if (err) {
        console.error("Error initializing tables:", err);
    } else {
        console.log("Tables initialized successfully.");
    }
});

// insertAdmin()

// query = `
//     SELECT * FROM User;
// `;

// db.all(query, (err, rows) => {
//     if (err) { console.log("error: " + err) } else {
//         console.log(rows);
//     }
// })

query = `
    INSERT INTO User(username, password)
    VALUES (?,?)
`;


// query = `
// DELETE FROM User;
// `
// db.run(query, [], (err) => {
//     if (err) { console.log(err) }
// })

// insertAdmin()


// async function insertAdmin() {
//     let hash = await bcrypt.hash("admin", 10);

//     db.run(query, ["admin", hash], (err) => {
//         if (err) { console.log("error: " + err) } else {
//             query = `
//             SELECT * FROM User;
//             `
//             db.all(query, [], (err, rows) => {
//                 if (err) { console.log(err) } else {
//                     console.log(rows)
//                     t()
//                 }
//                 async function t() {
//                     console.log(await bcrypt.compare(rows[0].password, "admin"))
//                     console.log(rows[0].password + "::: ", hash);
//                 }
//             })

//         }
//     })
// }

// query = `
//     SELECT * FROM User;
// `;

// db.all(query, [], (err, rows) => {
//     if (err) console.log(err)
//     else console.log(rows);
// })

// db.run(query, [], (err) => {
//     if (err) {
//         console.log("error db: " + err);
//     } else {
//         console.log("ok");
//     }
// });

// db.all(query, [], (err, rows) => {
//     if (err) {
//         console.log("error db: " + err);
//     }
//     console.log(rows);
// });

// query = `
//     INSERT INTO Orders (address, date, email, phoneNumber, userName)
//     VALUES (?, ?, ?, ?, ?);
// `

// db.run(query, ['123 Main St', '2024-09-06', 'john@example.com', 1234567890, 'John Doe'], (err) => {
//     if (err) {
//         console.log("error db: " + err);
//     }
// });

module.exports = db;