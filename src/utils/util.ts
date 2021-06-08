import { TextChannel } from "eris";
import { CommandContext } from "slash-create";
import Bot from "../bot";
import { PermissionString } from "./types";

export default class Util {
	private bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;

		process.on("unhandledRejection", (_, __) => {});
	}

	public verify(ctx: CommandContext, perms: PermissionString[]) {
		if (ctx.user.bot) return null;

		const channel = this.bot.client.getChannel(ctx.channelID) as TextChannel;
		if (!channel.guild) return null;

		const botPerms = channel.permissionsOf(this.bot.client.user.id);
		const botReq: string[] = perms.filter((perm) => !botPerms.has(perm));
		if (botReq.length > 0) {
			ctx.send(
				`🔑 I need to have ${this.join(
					botReq.sort().map((perm) => `\`${this.camelToNormal(perm)}\``)
				)} to use this command!`,
				{ ephemeral: true }
			);

			return null;
		}

		const memberPerms = channel.permissionsOf(ctx.user.id);
		const memberReq: string[] = perms.filter((perm) => !memberPerms.has(perm));
		if (memberReq.length > 0) {
			ctx.send(
				`🔑 You need to have ${this.join(
					memberReq.sort().map((perm) => `\`${this.camelToNormal(perm)}\``)
				)} to use this command!`,
				{ ephemeral: true }
			);

			return null;
		}

		return channel;
	}

	public error(ctx: CommandContext) {
		ctx.send("❌ An error occurred... Try again later", { ephemeral: true });
	}

	public camelToNormal(str: string) {
		return (str[0].toUpperCase() + str.slice(1)).split(/(?=[A-Z])/).join(" ");
	}

	public join(text: string[]) {
		const first = text.pop();
		if (text.length === 0) return first;

		if (text.length === 1) return `${text[0]} and ${first}`;
		return `${text.join(", ")}, and ${first}`;
	}

	public getFooter(ctx: CommandContext, text: string = "") {
		const user = ctx.user;

		return {
			text: `${user.username}${text === "" ? "" : ` | ${text}`}`,
			icon_url: user.dynamicAvatarURL("png")
		};
	}
}
