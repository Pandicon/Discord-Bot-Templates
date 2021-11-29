import getFiles from "./get-files";

export default (): {[key: string]: any}[] => {
	const allEvents = [] as {[key: string]: any}[];

	const suffix = ".ts";

	const eventFiles = getFiles("./events", suffix);
	console.log(eventFiles);

	let initialisedEvents = [] as string[];

	for(const event of eventFiles) {
		let eventOptions = require(event);
		if(eventOptions.default) eventOptions = eventOptions.default;
		console.log(eventOptions);
		let {
			name
		} = eventOptions;

		if(initialisedEvents.includes(name)) {
			throw new Error(`Duplicate event name ${name}.`);
		};
		allEvents.push(eventOptions);
		initialisedEvents.push(name);
	};

	return allEvents;
};