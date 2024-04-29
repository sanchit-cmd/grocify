const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserRouter = require('./routers/user');
const CartRouter = require('./routers/cart');
const InventoryRouter = require('./routers/inventory');
const OrderRouter = require('./routers/order')

const { authentication } = require('./middlewares/authentication');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
	.connect('mongodb://0.0.0.0:27017/grocify')
	.then(() => console.log('Database Connected'))
	.catch(error => console.log(error.message));

app.use('/api', UserRouter);
app.use('/cart', authentication, CartRouter);
app.use('/order', authentication, OrderRouter)
app.use('/items', InventoryRouter);

app.listen(3000, () => {
	console.log('server running on port 3000');
});
