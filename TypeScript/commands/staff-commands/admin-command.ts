import { Message } from "discord.js";
import { replyToMessage } from "../../utils/discord";

export default {
	commands: ["admin", "admin-command"],
	permissionError: "You need administrator permissions to run this command",
	permissions: ["ADMINISTRATOR"],
	callback: (message: Message, ...args: string[]) => {
		replyToMessage(message, false, "Command ran successfully!");
	}
};