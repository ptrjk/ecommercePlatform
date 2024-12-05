const db = require('../data/dbInit')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.verifyToken = (req, res, next) => {
    console.log('verifying...')

    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(403).json({ message: "No token found, access denied.", redirect: true });
        }
        const user = jwt.verify(token, "secret123")
        req.user = user
        console.log("OK")
        next()
    } catch (err) {
        console.log(err)
        res.json({ message: "something went wrong...", redirect: true }).status(400)
    }
}

exports.verifyTokenValidity = (req, res) => {
    console.log('verifying...')

    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(403).json({ message: "No token found, access denied.", redirect: true });
        }
        console.log("OK")
        res.status(200).json({ message: "ok" })
    } catch (err) {
        console.log(err)
        res.json({ message: "something went wrong...", redirect: true }).status(400)
    }
}


exports.postLogin = (req, res) => {
    console.log("logging in")
    const { username, password } = req.body
    console.log(username, password)

    try {



        const query = `
        SELECT * FROM User WHERE username = ?;
    `
        db.all(query, [username], (err, rows) => {
            if (err || rows === null || rows.length !== 1) {
                console.log(err || "something went wrong...")
                res.json({ message: "something went wrong..." }).status(400)
            } else {
                async function comparePassword() {
                    if (! await bcrypt.compare(password, user.password)) {
                        console.log("bad password")
                        res.json({ message: "bad password" }).status(400)
                    } else {
                        const token = jwt.sign(user, "secret123", { expiresIn: "1h" })
                        res.cookie('token', token)
                        res.json({ message: "ok" }).status(200)
                        console.log("ok")
                    }
                }
                const user = rows[0]
                comparePassword()
            }
        })
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Internal server error." });
    }
}