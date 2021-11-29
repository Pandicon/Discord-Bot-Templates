const { replyToMessage } = require("../utils/discord");

module.exports = {
	commands: ["max-1-arg", "max-1-argument"],
	expectedArgs: ["<alias> [any word]"],
	maxArgs: 1,
	callback: (message, ...args) => {
		replyToMessage(message, false, "Command ran successfully!");
	}
};