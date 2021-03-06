import Discord, { Intents } from "discord.js";
import "dotenv/config";
import connectToMongo from "./mongo";

const client = new Discord.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});

client.on("ready", async() => {
	console.log("The bot is online!");
	console.log("Connecting to Mongo");
	await connectToMongo();
	let commandsInitialiser = require("./initialise-commands.ts");
	if(commandsInitialiser.default) commandsInitialiser = commandsInitialiser.default;

	const commands: { [key: string]: any } = commandsInitialiser();

	let eventsInitialiser = require("./initialise-events.ts");
	if(eventsInitialiser.default) eventsInitialiser = eventsInitialiser.default;

	const events: {[key: string]: any}[] = eventsInitialiser();

	const eventArgs: {[key: string]: any} = {
		"messageCreate": commands
	};

	for(const event of events) {
		event.callback(client, eventArgs[event.name]);
	};
});

client.login(process.env.BOT_TOKEN);

export default client;
