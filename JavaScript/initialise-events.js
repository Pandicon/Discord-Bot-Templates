const getFiles = require("./get-files");

module.exports = () => {
	console.log("Initialising events");
	const allEvents = [];

	const suffix = ".js";

	const eventFiles = getFiles("./events", suffix);

	let initialisedEvents = [];

	for(const event of eventFiles) {
		let eventOptions = require(event);
		if(eventOptions.default) eventOptions = eventOptions.default;
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