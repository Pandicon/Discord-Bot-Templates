const { replyToMessage } = require("../../utils/discord");

module.exports = {
	commands: ["admin", "admin-command"],
	permissionError: "You need administrator permissions to run this command",
	permissions: ["ADMINISTRATOR"],
	callback: (message, ...args) => {
		replyToMessage(message, false, "Command ran successfully!");
	}
};