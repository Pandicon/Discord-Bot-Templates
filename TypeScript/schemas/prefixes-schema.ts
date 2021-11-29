import mongoose from "mongoose";

const reqString = {
	type: String,
	required: true
};

const schema = new mongoose.Schema({
	_id: reqString,
	prefix: reqString
});

export default mongoose.model("prefixes", schema, "prefixes");