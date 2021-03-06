import getFiles from "./get-files";
import { validPermissions } from "./config.json";

const validatePermissions = (permissions: string) => {
	for(const permission of permissions) {
		if(!validPermissions.includes(permission)) throw new Error(`Unknown permission "${permission}"`);
	};
};

export default (): {
	[key: string]: any
} => {
	console.log("Initialising commands");
	const allCommands = {} as {
		[key: string]: any
	};

	const suffix = ".ts";

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
