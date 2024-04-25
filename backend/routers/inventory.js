const { Router } = require('express');

const Inventory = require('../model/inventory');

const router = Router();

router.get('/', async (req, res) => {
	const allItems = await Inventory.find({});

	if (!allItems || allItems.length === 0)
		return res.json({ status: 'error', message: 'No items found' });

	return res.json({ count: allItems.length, data: allItems });
});

router.post('/', async (req, res) => {
	const body = req.body;
	const newItem = {
		name: body.name,
		description: body.description,
		productImage: body.productImage,
		price: body.price,
	};
	const addedItem = await Inventory.create(newItem);

	return res.json({ status: 'ok', data: addedItem });
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const deletedItem = await Inventory.findByIdAndDelete(id);
	return res.json({ item: deletedItem });
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;

	const item = await Inventory.findById(id);
	return res.json({ data: item });
});

module.exports = router;
