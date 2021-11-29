import { Message } from "discord.js";

export default {
	commands: ["admin", "admin-command"],
	expectedArgs: "",
	permissionError: "You need administrator permissions to run this command",
	minArgs: 0,
	maxArgs: null,
	permissions: ["ADMINISTRATOR"],
	callback: (message: Message, ...args: string[]) => {
		console.log("Command ran");
	}
};