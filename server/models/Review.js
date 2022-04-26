const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	product: {
		type: mongoose.Types.ObjectId,
		ref: 'Product',
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	title: {
		type: String,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	rating: {
		type: Number,
		default: 0,
	},
	isRecommended: {
		type: Boolean,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	updated: Date,
});

module.exports = mongoose.model('Review', ReviewSchema);
