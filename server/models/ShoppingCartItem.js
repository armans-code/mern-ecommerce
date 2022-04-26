const mongoose = require('mongoose');

const ShoppingCartItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Types.ObjectId,
		ref: 'Product',
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	quantity: Number,
});

module.exports = mongoose.model('ShoppingCartItem', ShoppingCartItemSchema);
