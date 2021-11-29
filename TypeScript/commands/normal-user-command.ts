import { Message } from "discord.js";
import { replyToMessage } from "../utils/discord";

export default {
	commands: ["user", "user-command"],
	callback: (message: Message, ...args: string[]) => {
		replyToMessage(message, false, "Command ran successfully!");
	}
};