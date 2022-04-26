const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const slugOptions = {
	separator: '-',
	lang: 'en',
	truncate: '120',
};

mongoose.plugin(slug, slugOptions);

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	slug: {
		type: String,
		slug: 'name',
		slug_padding_size: 5,
		unique: true,
	},
	category: {
		type: String,
		default: 'fashion',
		enum: ['fashion', 'electronics', 'toys', 'fitness'],
	},
	imageURL: {
		type: String,
	},
	imagePublic: {
		type: String,
	},
	quantity: {
		type: Number,
	},
	price: {
		type: Number,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	updated: Date,
});

ProductSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
