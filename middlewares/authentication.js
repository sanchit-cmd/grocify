const jwt = require('jsonwebtoken');

const User = require('../model/user');

async function authentication(req, res, next) {
	try {
		const token = req.headers['x-access-token'];
		if (!token)
			return res.json({ status: 'error', message: 'Invalid token' });

		const decoded = jwt.verify(token, 'secret123');
		const user = await User.findById(decoded.id);

		if (!user)
			return res.json({ status: 'error', message: 'No user Found' });

		req.user = user;
		return next();
	} catch (error) {
		console.log(error.message);
		return next();
	}
}

module.exports = {
	authentication,
};
