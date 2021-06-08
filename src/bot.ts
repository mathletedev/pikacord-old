import Eris, { Client, ClientOptions } from "eris";
import { join } from "path";
import { AnyRequestData, GatewayServer, SlashCreator } from "slash-create";
import Logger from "./utils/logger";
import Util from "./utils/util";

export default class Bot {
	public client: Client;
	public creator: SlashCreator;
	public util = new Util(this);
	public logger = new Logger();

	constructor(token: string, options?: ClientOptions) {
		try {
			this.client = Eris(token, options);

			this.creator = new SlashCreator({
				applicationID: "851159156345274369",
				publicKey:
					"3f3577fe649c2079b842c8fe84049928ebeaa497264c25cc59cb3e0e0dbd78a7",
				token
			});
		} catch (err) {
			this.logger.error(`Invalid token`, err);

			process.exit(1);
		}
	}

	public async launch() {
		await this.client.connect();

		this.creator
			.withServer(
				new GatewayServer((handler) =>
					this.client.on("rawWS", (evt) => {
						if (evt.t === "INTERACTION_CREATE")
							handler(evt.d as AnyRequestData);
					})
				)
			)
			.registerCommandsIn(join(__dirname, "commands"));
		await this.creator.syncCommands();

		this.client.editStatus("online", {
			name: "Pikacord",
			type: 0
		});

		this.logger.info("Bot is online!");
	}
}
