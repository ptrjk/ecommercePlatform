const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

upload = multer({ storage: storage });
module.exports = upload;


const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5000', 'http://localhost:3000'];
    const origin = req.headers.origin;

    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());

app.use(productsRoutes);
app.use(ordersRoutes);
app.use(authRoutes);
app.use(cartRoutes);

const port = 1880;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
