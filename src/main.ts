import { APIGuildInteraction } from "discord-api-types";
import { Client } from "eris";
import { Base } from "eris-sharder";
import { readdirSync } from "fs";
import { join } from "path";
import Command from "./commands/command";
import Logger from "./utils/logger";

export = class Bot extends Base {
	public cmds: Command[] = [];
	public logger = new Logger(this);

	public constructor(client: { bot: Client; clusterID: number }) {
		super(client);
	}

	public async launch() {
		this.loadCommands();

		this.bot.on("rawWS", (evt) => {
			if (evt.t === "INTERACTION_CREATE")
				this.interactionHandler(evt.d as APIGuildInteraction);
		});

		this.bot.editStatus("online", {
			name: "Pokécord",
			type: 0
		});

		console.log("Bot is online!");
	}

	private loadCommands() {
		readdirSync(join(__dirname, "commands")).forEach((cat) => {
			if (cat.endsWith(".js")) return;

			readdirSync(join(__dirname, "commands", cat)).forEach((file) => {
				const command: Command = require(`./commands/${cat}/${file}`).default;
				this.cmds.push(command);
				// this.util
				// 	.getApplication(process.env.DEV_GUILD)
				// 	.commands.post({ data: command.props });
			});
		});
	}

	private interactionHandler(interaction: APIGuildInteraction) {
		const name = interaction.data?.name.toLowerCase();
		const args = interaction.data?.options;

		const command = this.cmds.find((cmd) => cmd.props.name === name);
		if (!command) return;

		command.exec(this, interaction, args);
	}
};
