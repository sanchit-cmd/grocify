const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		productImage: {
			type: String,
			required: true,
			default:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1rfsDuqpnkGagMBi1gBffCvQ35v-79LOHNSmUUcJM_w&s',
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Inventory = mongoose.model('inventory', inventorySchema);
module.exports = Inventory;
