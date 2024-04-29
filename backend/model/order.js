const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		products: [
			{
				productId: { type: String, required: true },
				quantity: { type: Number, default: 1 },
			},
		],
		address: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			default: 'pending',
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
