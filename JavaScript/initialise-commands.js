const getFiles = require("./get-files");
const { validPermissions } = require("./config.json");

const validatePermissions = (permissions) => {
	for(const permission of permissions) {
		if(!validPermissions.includes(permission)) throw new Error(`Unknown permission "${permission}"`);
	};
};

module.exports = () => {
	console.log("Initialising commands");
	const allCommands = {};

	const suffix = ".js";

	const commandFiles = getFiles("./commands", suffix);

	for(const command of commandFiles) {
		let commandOptions = require(command);
		if(commandOptions.default) commandOptions = commandOptions.default;
		let {
			commands,
			permissions = []
		} = commandOptions;

		if(typeof commands == "string") commands = [commands];
		
		if(permissions.length) {
			if(typeof permissions == "string") permissions = [permissions];

			validatePermissions(permissions);
		};

		for(const command of commands) {
			allCommands[command] = {
				...commandOptions,
				commands,
				permissions
			};
		};
	};

	return allCommands;
};