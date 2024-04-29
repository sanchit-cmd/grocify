const { Router } = require('express');

const Order = require('../model/order');
const Cart = require('../model/cart');
const Inventory = require('../model/inventory');

const router = Router();

router.get('/latest', async (req, res) => {
	try {
		const latestOrder = await Order.findOne({ userId: req.user.id }).sort({
			createdAt: -1,
		});

		return res.json(latestOrder);
	} catch (error) {
		return res.json({ message: error.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const allOrders = await Order.find({ userId: req.user.id });
		return res.json({ orders: allOrders });
	} catch (error) {
		return res.json({ status: 'error', message: error.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const order = await Order.findById(id);
		return res.json(order);
	} catch (error) {
		return res.json({ status: 'error', message: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const { address } = req.body;
		let amount = 0;
		let price;

		const cart = await Cart.findOne({ userId: req.user.id });

		for (let i = 0; i < cart.products.length; i++) {
			const item = await Inventory.findById(cart.products[i].productId);
			price = item.price * cart.products[i].quantity;

			amount += price;
		}

		const newOrder = await Order.create({
			userId: req.user.id,
			products: cart.products,
			address: address,
			amount,
			status: 'pending',
		});

		cart.products = [];
		await cart.save();
		return res.json({ order: newOrder });
	} catch (error) {
		console.log(error);
		return res.json({ status: 'error', message: error });
	}
});

module.exports = router;


