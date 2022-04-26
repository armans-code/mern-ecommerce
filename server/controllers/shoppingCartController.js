// const ShoppingCart = require('../models/ShoppingCart');
const ShoppingCartItem = require('../models/ShoppingCartItem');
const express = require('express');
const { protect } = require('../middleware/authJwt');
const router = express.Router();

// retrieve specific cart
router.get('/get-items/:id', protect, async (req, res) => {
	try {
		let items = await ShoppingCartItem.find({
			user: req.params.id,
		}).populate('product');
		res.status(200).send(items);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// create new item
router.post('/new-item', protect, async (req, res) => {
	try {
		let item = await ShoppingCartItem.create({
			product: req.body.product,
			user: req.body.user,
			quantity: req.body.quantity,
		});
		res.send(item);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// delete item
router.delete('/delete-item', protect, async (req, res) => {
	try {
		let item = await ShoppingCartItem.findByIdAndDelete(req.body.id);
		res.send(item);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// retrieving all items
router.get('/get-items', protect, async (req, res) => {
	try {
		let items = await ShoppingCartItem.find()
			.populate('product')
			.populate('user');
		res.send(items);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// delete item from a cart
router.delete('/remove-item/:id', protect, async (req, res) => {
	try {
		let item = await ShoppingCartItem.findByIdAndDelete(req.params.id);
		res.status(200).send(item);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// add item to a cart
router.put('/add-item', protect, async (req, res) => {
	try {
		const user_id = req.body.user;
		const product_id = req.body.product;
		const quantity = req.body.quantity;

		let item = await ShoppingCartItem.findOneAndUpdate(
			{
				user: user_id,
				product: product_id,
			},
			{
				$inc: { quantity: req.body.quantity },
			}
		);

		if (!item) {
			let createdItem = await ShoppingCartItem.create({
				user: user_id,
				product: product_id,
				quantity: quantity,
			});
			res.status(200).send(createdItem);
		}
		res.status(200).send(item);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.put('/change-quantity', protect, async (req, res) => {
	try {
		let item = await ShoppingCartItem.findByIdAndUpdate(req.body.id, {
			quantity: req.body.quantity,
		});
		res.status(200).send(item);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
