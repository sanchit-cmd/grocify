const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	userId: { type: String, required: true, unique: true },
	products: [
		{
			productId: { type: String, required: true, unique: true },
			quantity: { type: Number, default: 1 },
		},
	],
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;
