import { Client, Message } from "discord.js";
import { prefix as defaultPrefix } from "../config.json";
import { replyToMessage, memberHasPermissions } from "../utils/discord";
import { getPrefix } from "../utils/prefix-handler";

const runCommand = async(message: Message, commands: { [key: string]: any }) => {
	if(message.channel.type == "DM") return;
	const prefix = await getPrefix(message!.guild!.id) || defaultPrefix;
	const text = message.content;
	if(message.author.bot || !text.startsWith(prefix)) return;
	const args = text.slice(prefix.length).split(/ +/);
	const commandName = args.shift();
	if(!commandName || !commands[commandName]) return;
	const command = commands[commandName];
	const {
		permissions = [],
		minArgs = 0,
		maxArgs = null,
		expectedArgs = "",
		permissionError = "You do not have all the required permissions to run this command"
	} = command;
	if(args.length < minArgs || (typeof maxArgs == "number" && maxArgs < args.length)) { // Wrong amount of arguments
		let messageArgs = expectedArgs;
		if(typeof expectedArgs == "object") messageArgs = expectedArgs.join("\n");
		messageArgs = messageArgs.replace(/<alias>/g, `${prefix}${commandName}`);
		replyToMessage(message, true, `Incorrect syntax! Please use one of the following options:\n\`${messageArgs}\``);
		return;
	};
	if(!memberHasPermissions(message.member!, permissions, message.channel, true)) { // Doesn't have all the required permissions
		replyToMessage(message, true, `${permissionError}`);
		return;
	};
	command.callback(message, ...args);
}

export default {
	name: "messageCreate",
	callback: (client: Client, commands: { [key: string]: any }) => {
		client.on("messageCreate", async message => {
			// Running commands
			await runCommand(message, commands);
		});
	}
};