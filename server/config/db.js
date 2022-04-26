const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(
			`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
		);
	} catch (error) {
		console.log(`Erorr: ${error.message}`.red);
		process.exit(1);
	}
};

module.exports = connectDB;
