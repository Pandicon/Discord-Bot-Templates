import { prefix as defaultPrefix } from "../config.json";
import prefixesSchema from "../schemas/prefixes-schema";

const cache: {[key: string]: string} = {};

export const getPrefix = async(guildId: string): Promise<string> => {
	if(cache[guildId]) return cache[guildId];
	const result = await prefixesSchema.findOne({_id: guildId});
	let prefix = "";
	if(result && result.prefix) prefix = result.prefix;
	else prefix = defaultPrefix;
	cache[guildId] = prefix;
	return prefix;
};

export const setPrefix = async(guildId: string, newPrefix: string): Promise<string> => {
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