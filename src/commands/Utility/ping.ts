import { stripIndents } from "common-tags";
import { CommandContext, SlashCommand, SlashCreator } from "slash-create";
import bot from "../..";

export = class PingCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: "ping",
			description: "Checks the latency of the server"
		});
	}

	public async run(ctx: CommandContext) {
		const channel = bot.util.verify(ctx, ["sendMessages", "embedLinks"]);
		if (!channel) return;

		await ctx.send("🏓 Ping?");

		const ping = await ctx.fetch();
		ping.edit({
			embeds: [
				{
					title: "🏓 Pong!",
					description: stripIndents`
				❯ ⌛ ${Math.round(ping.timestamp - ctx.invokedAt)} ms

				❯ 💓 ${channel.guild.shard.latency.toFixed()} ms
			`,
					footer: bot.util.getFooter(ctx),
					timestamp: new Date()
				}
			]
		});
	}
};
