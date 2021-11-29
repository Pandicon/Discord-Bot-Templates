import { Message } from "discord.js";
import { replyToMessage } from "../utils/discord";

export default {
	commands: ["max-1-arg", "max-1-argument"],
	expectedArgs: ["<alias> [any word]"],
	maxArgs: 1,
	callback: (message: Message, ...args: string[]) => {
		replyToMessage(message, false, "Command ran successfully!");
	}
};