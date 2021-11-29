const { replyToMessage } = require("../utils/discord");

module.exports = {
	commands: ["min-1-arg", "min-1-argument"],
	expectedArgs: ["<alias> <any words>"],
	minArgs: 1,
	callback: (message, ...args) => {
		replyToMessage(message, false, "Command ran successfully!");
	}
};