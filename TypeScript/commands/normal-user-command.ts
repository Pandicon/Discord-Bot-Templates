import { Message } from "discord.js";

export default {
	commands: ["user", "user-command"],
	callback: (message: Message, ...args: string[]) => {
		message.reply("Command ran successfully!");
	}
};