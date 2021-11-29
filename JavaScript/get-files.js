const fs = require("fs");

const getFiles = (directory, suffix) => {
	const files = fs.readdirSync(directory, {
		withFileTypes: true
	});

	let commandFiles = [];

	for(const file of files) {
		if(file.isDirectory()) {
			commandFiles = [
				...commandFiles,
				...getFiles(`${directory}/${file.name}`, suffix)
			];
		} else if(file.name.endsWith(suffix)) {
			commandFiles.push(`${directory}/${file.name}`);
		};
	};

	return commandFiles;
};

module.exports = getFiles;