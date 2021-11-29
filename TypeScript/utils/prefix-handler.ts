import { prefix as defaultPrefix } from "../config.json";
import prefixesSchema from "../schemas/prefixes-schema";

const cache: {[key: string]: string} = {};

export const getPrefix = async(guildId: string) => {
	if(cache[guildId]) return cache[guildId];
	const result = await prefixesSchema.findOne({_id: guildId});
	let prefix = "";
	if(result && result.prefix) prefix = result.prefix;
	else prefix = defaultPrefix;
	cache[guildId] = prefix;
};

export const setPrefix = async(guildId: string, newPrefix: string) => {
	if(newPrefix == cache[guildId]) return;
	if(newPrefix == defaultPrefix) {
		await prefixesSchema.deleteMany({_id: guildId});
		cache[guildId] = newPrefix;
		return;
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
};