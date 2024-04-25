const { Router } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const Cart = require('../model/cart');

const router = Router();

router.post('/register', async (req, res) => {
	try {
		const body = req.body;
		const newUser = await User.create({
			name: body.name,
			email: body.email,
			password: body.password,
		});
		const newCart = await Cart.create({
			userId: newUser._id,
			products: [],
		});
		return res.status(200).json({ user: newCart, cart: newCart });
	} catch (error) {
		console.log(error.message);
		return res.json({ status: 'error', message: 'Email already exist' });
	}
});

router.post('/login', async (req, res) => {
	const body = req.body;
	const user = await User.findOne({
		email: body.email,
		password: body.password,
	});

	if (!user) return res.status(201).json({ user: false });

	const token = jwt.sign(
		{
			email: user.email,
			name: user.name,
			id: user._id,
			role: user.role,
		},
		'secret123'
	);
	return res.status(200).json({ user: token });
});

module.exports = router;
