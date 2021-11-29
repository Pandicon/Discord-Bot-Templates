import fs, { Dirent } from "fs";

const getFiles = (directory: string, suffix: string): string[] => {
	const files: Dirent[] = fs.readdirSync(directory, {
		withFileTypes: true
	});

	let commandFiles: string[] = [];

	for(const file of files) {
		if(file.isDirectory()) {
			commandFiles = [
				...commandFiles,
				...getFiles(`${directory}/${file.name}`, suffix)
			];
		} else if(file.name.endsWith(suffix)) {
			commandFiles.push(`${directory}/${file.name}`);
		}
	}

	return commandFiles;
}

export default getFiles;