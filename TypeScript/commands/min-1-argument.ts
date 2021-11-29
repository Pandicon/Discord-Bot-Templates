import { Message } from "discord.js";

export default {
	commands: ["min-1-arg", "min-1-argument"],
	expectedArgs: ["<alias> <any words>"],
	minArgs: 1,
	callback: (message: Message, ...args: string[]) => {
		message.reply("Command ran successfully!");
	}
};