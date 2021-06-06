import Command from "../command";

export default new Command(
	{
		name: "ping",
		description: "Checks the latency of the server!"
	},
	{
		perms: [],
		category: "Utilities",
		examples: ["/ping"]
	},
	async ({ bot, interaction, args }) => {
		console.log("test");
	}
);
