const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { protect } = require('../middleware/authJwt');
const cookieParser = require('cookie-parser');

router.post('/register', async (req, res) => {
	try {
		User.findOne({ username: req.body.username }).then(async (err, user) => {
			if (err) res.status(500).send(err);

			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) console.error(err);

				User.create({
					username: req.body.username,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					hash_password: hash,
					role: req.body.role,
				});
			});
		});
	} catch (error) {
		res.send(error.message);
	}
});

router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
		});

		const profile = await User.findOne({
			email: req.body.email,
		}).select('-hash_password');

		const validPassword = bcrypt.compareSync(
			req.body.password,
			user.hash_password
		);

		console.log(profile);

		if (user) {
			if (!validPassword) {
				``;
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid password',
				});
			}

			const accessToken = jwt.sign(
				{
					id: user.id,
					role: user.role,
					profile: profile,
				},
				process.env.JWT_ACCESS_TOKEN_SECRET,
				{
					expiresIn: '10s',
				}
			);

			const refreshToken = jwt.sign(
				{
					id: user.id,
					role: user.role,
					profile: profile,
				},
				process.env.JWT_REFRESH_SECRET,
				{
					expiresIn: '10m',
				}
			);

			res.cookie('refresh_token', refreshToken, {
				maxAge: 900000,
				httpOnly: true,
			});

			// console.log('refresh token: ' + refreshToken);
			res.status(200).send({
				access_token: accessToken,
				user: profile,
				id: user.id,
				role: user.role,
			});
		} else {
			return res.json({ status: 'error', user: false });
		}
	} catch (error) {
		res.status(400).send(error.message);
		console.log(error.message);
	}
});

router.get('/refresh', async (req, res) => {
	try {
		const refresh_token = req.cookies.refresh_token;
		if (refresh_token == null) {
			return res.status(401).json({ error: 'Null refresh token' });
		}
		jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (error, user) => {
			if (error) return res.status(403).json({ error: error.message });
			const accessToken = jwt.sign(
				{
					id: user.id,
					role: user.role,
					profile: user.profile,
				},
				process.env.JWT_ACCESS_TOKEN_SECRET,
				{
					expiresIn: '10s',
				}
			);

			const refreshToken = jwt.sign(
				{
					id: user.id,
					role: user.role,
					profile: user.profile,
				},
				process.env.JWT_REFRESH_SECRET,
				{
					expiresIn: '10m',
				}
			);

			res.cookie('refresh_token', refreshToken, {
				maxAge: 900000,
				httpOnly: true,
			});

			res.json({
				access_token: accessToken,
				role: user.role,
				id: user.id,
				profile: user.profile,
			});
		});
	} catch (error) {
		return res.send(error.message);
	}
});

router.get('/logout', async (req, res) => {
	try {
		const cookies = req.cookies;
		if (!cookies?.refresh_token) return res.sendStatus(204); // no content
		const refreshToken = cookies.refresh_token;
		res.clearCookie('refresh_token', { httpOnly: true });
		res.sendStatus(204);
	} catch (error) {}
});

router.get('/profile/:id', protect, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-hash_password');

		if (user) {
			return res.send(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.send(error.message);
	}
});

router.put('/edit/:id', protect, async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.params.id, req.body)
			.select('-hash_password')
			.then(() => {
				res.send('Success');
			});
	} catch (error) {
		res.send(error.message);
	}
});

router.delete('/refresh', (req, res) => {
	try {
		res.clearCookie('refresh_token');
		return res.status(200).json({ message: 'Refresh token deleted' });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

router.get('/', protect, async function (req, res) {
	try {
		let user = await User.find();
		res.send(user);
	} catch (error) {
		res.status(400);
	}
});

router.get('/:id', protect, async function (req, res) {
	try {
		let user = await User.findById(req.params.id).select('-hash_password');
		res.send(user);
	} catch (error) {
		res.status(400);
	}
});

router.delete('/:id', async function (req, res) {
	try {
		let user = await User.findByIdAndDelete(req.params.id);
		res.send(user);
	} catch (error) {
		res.status(400);
	}
});

module.exports = router;
