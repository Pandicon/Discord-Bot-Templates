const { prefix: defaultPrefix } = require("../config.json");
const prefixesSchema = require("../schemas/prefixes-schema");

const cache = {};

const getPrefix = async(guildId) => {
	if(cache[guildId]) return cache[guildId];
	const result = await prefixesSchema.findOne({_id: guildId});
	let prefix = "";
	if(result && result.prefix) prefix = result.prefix;
	else prefix = defaultPrefix;
	cache[guildId] = prefix;
	return prefix;
};

const setPrefix = async(guildId, newPrefix) => {
	if(newPrefix == cache[guildId]) return "same";
	if(newPrefix == defaultPrefix) {
		await prefixesSchema.deleteMany({_id: guildId});
		cache[guildId] = newPrefix;
		return "default";
	};
	await prefixesSchema.findByIdAndUpdate(
		guildId,
		{
		  prefix: newPrefix,
		},
		{
			new: true,
			upsert: true
		}
	);
	cache[guildId] = newPrefix;
	return "new";
};

module.exports = {
	getPrefix,
	setPrefix
};