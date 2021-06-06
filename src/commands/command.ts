import {
	APIApplicationCommandInteractionDataOption,
	APIApplicationCommandInteractionDataOptionWithValues,
	APIGuildInteraction,
	RESTPostAPIApplicationCommandsJSONBody
} from "discord-api-types";
import Bot from "../main";
import { PermissionString } from "../utils/types";

interface Details {
	perms: PermissionString[];
	category: "Pokémon" | "Utilities";
	examples: string[];
}

interface CommandExecuteArgs {
	bot: Bot;
	interaction: APIGuildInteraction;
	args: Record<string, any>;
}

type CommandExecuteType = (args: CommandExecuteArgs) => Promise<any>;

export default class Command {
	public props: RESTPostAPIApplicationCommandsJSONBody;
	public details: Details;
	private _exec: CommandExecuteType;

	public constructor(
		props: RESTPostAPIApplicationCommandsJSONBody,
		details: Details,
		exec: CommandExecuteType
	) {
		this.props = props;
		this.details = details;
		this._exec = exec;
	}

	public exec(
		bot: Bot,
		interaction: APIGuildInteraction,
		args?: APIApplicationCommandInteractionDataOption[]
	) {
		// TODO: PermissionFlagsBits isn't importing correctly
		// for (const perm of this.details.perms) {
		// 	if (
		// 		(BigInt(interaction.member.permissions) & PermissionFlagsBits[perm]) !==
		// 		PermissionFlagsBits[perm]
		// 	)
		// 		return;
		// }

		let parsedArgs: Record<string, any> = {};
		if (args) {
			for (const arg of args)
				parsedArgs[arg.name] = (
					arg as APIApplicationCommandInteractionDataOptionWithValues
				).value;
		}

		this._exec({ bot, interaction, args: parsedArgs });
	}
}
