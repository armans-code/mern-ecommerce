const Product = require('../models/Product');
const Review = require('../models/Review');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary');
const { protect } = require('../middleware/authJwt');
const mongoose = require('mongoose');

router.post('/new', upload.single('img'), protect, async (req, res) => {
	cloudinary.config({
		cloud_name: 'dmo6klexl',
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
	try {
		var imageUrl;
		cloudinary.v2.uploader.upload(req.file.path, function (error, result) {
			imageUrl = result.secure_url;
			Product.create({
				name: req.body.name,
				description: req.body.description,
				imageURL: imageUrl,
				imagePublic: result.public_id,
				quantity: req.body.quantity,
				price: req.body.price,
				user: req.body.user,
				category: req.body.category,
			}).then(function (result) {
				res.send(result);
			});
			if (error) {
				console.log(error);
			}
		});
	} catch (error) {
		res.send(error);
	}
});

router.get('/', async (req, res) => {
	try {
		let product = await Product.find();
		res.send(product);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get('/c/:category', protect, async (req, res) => {
	try {
		console.log(req.params.category);
		let products = await Product.find({ category: req.params.category });
		res.status(200).send(products);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.get('/:slug', protect, async (req, res) => {
	try {
		let product = await Product.findOne({ slug: req.params.slug }).populate(
			'user'
		);
		res.send(product);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get('/user/:id', protect, async (req, res) => {
	try {
		let products = await Product.find({ user: req.params.id });

		res.send(products);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post('/s/search', protect, async (req, res) => {
	try {
		const searchParam = req.body.searchParam;
		const result = await Product.aggregate([
			{ $match: { $text: { $search: searchParam } } },
		]);
		res.send(result);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.put('/edit/:id', protect, async (req, res) => {
	try {
		let product = await Product.findByIdAndUpdate(req.params.id, {
			name: req.body.name,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
			quantity: req.body.quantity,
			price: req.body.price,
			user: req.body.user,
			category: req.body.category,
		});
		res.send(product);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.delete('/delete/:id', protect, async (req, res) => {
	cloudinary.config({
		cloud_name: 'dmo6klexl',
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
	try {
		let product = await Product.findByIdAndDelete(req.params.id);
		cloudinary.v2.uploader.destroy(
			product.imagePublic,
			function (error, result) {
				console.log(error);
				res.send(product);
			}
		);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.delete('/deletemany', async (req, res) => {
	try {
		for (let i = 0; i < req.body._ids.length; i++) {
			let product = await Product.findByIdAndDelete(req.body._ids[i]);
		}
		res.status(200).send('Success');
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
