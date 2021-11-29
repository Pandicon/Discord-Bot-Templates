const { Client, Message } = require("discord.js");
const { prefix: defaultPrefix } = require("../config.json");
const { replyToMessage, memberHasPermissions } = require("../utils/discord");
const { getPrefix } = require("../utils/prefix-handler");
const client = require("../index");

const runCommand = async(message, commands) => {
	if(message.channel.type == "DM") return;
	if(!message?.channel || !message?.guild || !client?.user || message.author.bot) return;
	const prefix = await getPrefix(message.guild.id) || defaultPrefix;
	const text = message.content;
	if(text.toLowerCase() == `<@${client.user.id}>` || text.toLowerCase() == `<@!${client.user.id}>`) {
		replyToMessage(message, false, `My prefix here is \`${prefix}\``);
	};
	if(!text.startsWith(prefix)) return;
	const args = text.slice(prefix.length).trim().split(/ +/);
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
	if(!memberHasPermissions(message.member, permissions, message.channel, true)) { // Doesn't have all the required permissions
		replyToMessage(message, true, `${permissionError}`);
		return;
	};
	try {
		command.callback(message, ...args);
	} catch(error) {
		console.log(error);
	};
}

module.exports = {
	name: "messageCreate",
	callback: (client, commands) => {
		client.on("messageCreate", async message => {
			// Running commands
			try {
				await runCommand(message, commands);
			} catch(error) {
				console.log(error);
			};
		});
	}
};