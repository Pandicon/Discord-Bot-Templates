const mongoose = require('mongoose');
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

module.exports = async () => {
	if(!mongoURI) return;
    await mongoose.connect(mongoURI, {
        keepAlive: true
    });
};