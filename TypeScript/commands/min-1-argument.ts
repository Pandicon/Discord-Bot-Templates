import { Message } from "discord.js";
import { replyToMessage } from "../utils/discord";

export default {
	commands: ["min-1-arg", "min-1-argument"],
	expectedArgs: ["<alias> <any words>"],
	minArgs: 1,
	callback: (message: Message, ...args: string[]) => {
		replyToMessage(message, false, "Command ran successfully!");
	}
};