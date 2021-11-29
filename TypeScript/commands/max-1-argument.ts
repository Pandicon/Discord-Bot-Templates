import { Message } from "discord.js";

export default {
	commands: ["max-1-arg", "max-1-argument"],
	expectedArgs: ["<alias> [any word]"],
	maxArgs: 1,
	callback: (message: Message, ...args: string[]) => {
		message.reply("Command ran successfully!");
	}
};