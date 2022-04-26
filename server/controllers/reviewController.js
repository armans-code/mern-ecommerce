const Review = require('../models/Review');
const Product = require('../models/Product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { protect } = require('../middleware/authJwt');

router.post('/new', protect, async (req, res) => {
	try {
		let review = await Review.create({
			product: req.body.product,
			user: req.body.user,
			title: req.body.title,
			description: req.body.description,
			rating: req.body.rating,
			isRecommended: req.body.isRecommended,
		});

		res.send(review);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post('/average', protect, async (req, res) => {
	try {
		let product = mongoose.Types.ObjectId(req.body.product);
		let totalResult = await Review.aggregate([
			{
				$match: {
					product: product,
				},
			},
			{
				$group: {
					_id: '$product',
					avgRating: {
						$avg: '$rating',
					},
				},
			},
		]);
		// console.log(totalResult);
		console.log(req.body);
		res.send(totalResult);
	} catch (error) {
		console.error(error);
	}
});

router.get('/', protect, async (req, res) => {
	try {
		let review = await Review.find().populate('product').populate('user');
		res.send(review);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get('/:slug', protect, async (req, res) => {
	try {
		let product = await Product.findOne({ slug: req.params.slug });

		if (!product) {
			return res.status(404).json({
				message: 'No reviews for this product.',
			});
		}

		let reviews = await Review.find({ product: product._id })
			.populate('product')
			.populate('user')
			.sort('-created');
		res.send(reviews);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.delete('/delete/:id', protect, async (req, res) => {
	try {
		let review = await Review.findByIdAndDelete(req.params.id);
		res.send(review);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.put('/edit/:id', async (req, res) => {
	try {
		let review = await Review.findByIdAndUpdate(req.params.id, {
			product: req.body.product,
			user: req.body.user,
			title: req.body.title,
			description: req.body.description,
			rating: req.body.rating,
			isRecommended: req.body.isRecommended,
			created: req.body.created,
		});
		res.send(review);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
