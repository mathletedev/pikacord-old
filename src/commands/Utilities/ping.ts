import { CommandContext, SlashCommand, SlashCreator } from "slash-create";

export = class PingCommand extends SlashCommand {
	public constructor(creator: SlashCreator) {
		super(creator, {
			name: "ping",
			description: "Check the server's latency!"
		});

		this.filePath = __filename;
	}

	async run(ctx: CommandContext) {
		return "Pong!";
	}
};
