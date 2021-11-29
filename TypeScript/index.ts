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
	let commandsInitialiser = require("./initialise-commands.ts");
	if(commandsInitialiser.default) commandsInitialiser = commandsInitialiser.default;

	const commands = commandsInitialiser();
	console.log(commands);

	let eventsInitialiser = require("./initialise-events.ts");
	if(eventsInitialiser.default) eventsInitialiser = eventsInitialiser.default;

	const events = eventsInitialiser();
	console.log(events);
});

client.on("messageCreate", (message) => {
	console.log(message.content);
});

client.login(process.env.BOT_TOKEN);