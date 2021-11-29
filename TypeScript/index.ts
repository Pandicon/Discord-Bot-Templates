import Discord, { Intents } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Discord.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});

client.on("ready", () => {
	console.log("The bot is online!");
	let initialiser = require("./initialise-commands.ts");
	if(initialiser.default) initialiser = initialiser.default;

	const commands = initialiser(client);
	console.log(commands);
});

client.on("messageCreate", (message) => {
	console.log(message.content);
});

client.login(process.env.BOT_TOKEN);