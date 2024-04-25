const mongoose = require('mongoose');

const user = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'USER',
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('user', user);
module.exports = User;
