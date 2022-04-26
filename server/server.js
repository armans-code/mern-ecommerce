const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const userRouter = require('./controllers/userController');
const productRouter = require('../server/controllers/productController');
const reviewRouter = require('../server/controllers/reviewController');
const shoppingCartRouter = require('../server/controllers/shoppingCartController');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const validator = require('validator');

dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
connectDB();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/reviews', reviewRouter);
app.use('/cart', shoppingCartRouter);

app.listen(
	PORT,
	console.log(
		`server running ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
);
