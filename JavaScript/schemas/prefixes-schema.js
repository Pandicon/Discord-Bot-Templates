const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true
};

const schema = new mongoose.Schema({
	_id: reqString,
	prefix: reqString
});

module.exports = mongoose.model("prefixes", schema, "prefixes");