import { CommandContext, SlashCommand, SlashCreator } from "slash-create";
import bot from "../..";

export = class PurgeCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: "purge",
			description: "Deletes messages from a channel",
			options: [
				{
					name: "amount",
					description: "The number of messages to purge",
					type: 4,
					required: true
				}
			]
		});
	}

	public async run(ctx: CommandContext) {
		const channel = bot.util.verify(ctx, ["manageMessages"]);
		if (!channel) return;

		const amount = await channel
			.purge(ctx.options.amount)
			.catch(() => bot.util.error(ctx));

		ctx.send(`🗑️ Deleted ${amount} message${amount === 1 ? "" : "s"}`, {
			ephemeral: true
		});
	}
};
