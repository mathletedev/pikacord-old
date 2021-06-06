import { Client } from "eris";
import { Base } from "eris-sharder";
import { join } from "path";
import { GatewayServer, SlashCreator } from "slash-create";
import { GuildMessageComponentRequestData } from "slash-create/lib/constants";
import { __devGuild__ } from "./utils/constants";

export = class Bot extends Base {
	private creator = new SlashCreator({
		applicationID: "851159156345274369",
		publicKey:
			"3f3577fe649c2079b842c8fe84049928ebeaa497264c25cc59cb3e0e0dbd78a7",
		token: process.env.BOT_TOKEN!
	});

	public constructor(client: { bot: Client; clusterID: number }) {
		super(client);
	}

	public async launch() {
		this.creator
			.withServer(
				new GatewayServer((handler) =>
					this.bot.on("rawWS", (event) => {
						if (event.t === "INTERACTION_CREATE")
							handler(event.d as GuildMessageComponentRequestData);
					})
				)
			)
			.registerCommandsIn(join(__dirname, "commands"));

		await this.creator.syncCommandsIn(__devGuild__);

		this.bot.editStatus("online", {
			name: "Pokémon",
			type: 0
		});

		console.log("Bot is online!");
	}
};
