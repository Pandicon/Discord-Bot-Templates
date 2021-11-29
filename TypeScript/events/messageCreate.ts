import { Client } from "discord.js";

export default {
	name: "messageCreate",
	callback: (client: Client) => {
		client.on("messageCreate", message => {
			console.log(message);
		});
	}
};