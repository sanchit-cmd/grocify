const { Router } = require('express');

const Cart = require('../model/cart');

const router = Router();

router.get('/', async (req, res) => {
	try {
		const user = req.user;
		const cart = await Cart.findOne({ userId: user.id });
		if (!cart)
			return res.json({ status: 'error', message: 'No user cart found' });
		return res.json(cart);
	} catch (error) {
		console.log(error);
	}
});

router.post('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		await Cart.updateOne(
			{ userId: req.user.id },
			{
				$push: {
					products: {
						productId: id,
						quantity: 1,
					},
				},
			}
		);
		const cart = await Cart.findOne({ userId: req.user.id });
		return res.json({ cart });
	} catch (error) {
		console.log(error);
	}
});

router.put('/decrease/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const cart = await Cart.findOne({ userId: req.user.id });
		const productIndex = cart.products.findIndex(
			product => product.productId === id
		);

		if (productIndex === -1)
			return res.json({ status: 'error', message: 'No item found' });

		const product = cart.products[productIndex];

		if (product.quantity === 1) {
			cart.products.splice(productIndex, 1);
		} else {
			product.quantity--;
		}
		await cart.save();

		return res.json({ status: 'Ok', product });
	} catch (error) {
		console.log(error.message);
		return res.json({ message: error.message });
	}
});

router.put('/increase/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const cart = await Cart.findOne({ userId: req.user.id });
		const productIndex = cart.products.findIndex(
			product => product.productId === id
		);

		if (productIndex === -1)
			return res.json({ status: 'error', message: 'No item found' });

		const product = cart.products[productIndex];

		product.quantity++;
		await cart.save();

		return res.json({ status: 'Ok', product });
	} catch (error) {
		console.log(error.message);
		return res.json({ message: error.message });
	}
});

module.exports = router;
