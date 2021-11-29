const { replyToMessage } = require("../utils/discord");

module.exports = {
	commands: ["user", "user-command"],
	callback: (message, ...args) => {
		replyToMessage(message, false, "Command ran successfully!");
	}
};