import { Message } from "discord.js";

export default {
	commands: [],
	expectedArgs: "",
	permissionError: "",
	minArgs: 0,
	maxArgs: null,
	permissions: [],
	callback: (message: Message, ...args: string[]) => {
		// Your command logic
	}
};