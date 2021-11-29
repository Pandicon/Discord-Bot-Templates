import { Message } from "discord.js";

export default {
	commands: ["admin", "admin-command"],
	permissionError: "You need administrator permissions to run this command",
	permissions: ["ADMINISTRATOR"],
	callback: (message: Message, ...args: string[]) => {
		message.reply("Command ran successfully!");
	}
};