const mongoose = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		unique: true,
		trim: true,
		lowercase: true,
		validate: [isEmail, 'invalid email'],
	},
	firstName: {
		type: String,
		trim: true,
	},
	lastName: {
		type: String,
		trim: true,
	},
	username: {
		type: String,
		required: [true, 'Please provide a username'],
		unique: true,
		trim: true,
	},
	hash_password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'ROLE_MEMBER',
		enum: ['ROLE_MEMBER', 'ROLE_ADMIN', 'ROLE_MERCHANT'],
	},
});

module.exports = mongoose.model('User', UserSchema);
