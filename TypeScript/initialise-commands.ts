import { Client } from "discord.js";
import getFiles from "./get-files";
import { validPermissions } from "./config.json";

const validatePermissions = (permissions: string) => {
	for(const permission of permissions) {
		if(!validPermissions.includes(permission)) throw new Error(`Unknown permission "${permission}"`);
	};
}

export default (client: Client): {
	[key: string]: any
} => {
	const allCommands = {} as {
		[key: string]: any
	}

	const suffix = ".ts";

	const commandFiles = getFiles("./commands", suffix);
	console.log(commandFiles);

	for(const command of commandFiles) {
		let commandOptions = require(command);
		if(commandOptions.default) commandOptions = commandOptions.default;
		console.log(commandOptions);
		let {
			commands,
			expectedArgs = "",
			permissionError = "You do not have all the required permissions to run this command",
			minArgs = 0,
			maxArgs = null,
			permissions = [],
			callback
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