import { Message } from "discord.js";
import { replyToMessage } from "../../utils/discord";
import { setPrefix } from "../../utils/prefix-handler";

export default {
	commands: ["prefix", "change-prefix"],
	expectedArgs: ["<alias> <new prefix>"],
	minArgs: 1,
	permissionError: "You need administrator permissions to run this command",
	permissions: ["ADMINISTRATOR"],
	callback: async(message: Message, ...args: string[]) => {
		const newPrefix = args[0];
		if(!message?.guild?.id) return replyToMessage(message, false, "Something went wrong, please try again later.");
		let state = await setPrefix(message.guild?.id, newPrefix);
		if(state == "same") {
			replyToMessage(message, false, `The prefix is already set to \`${newPrefix}\`!`);
			return;
		};
		replyToMessage(message, false, `The prefix was successfully set to \`${newPrefix}\`!`);
	}
};