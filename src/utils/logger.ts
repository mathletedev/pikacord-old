import Bot from "../main";

export default class Logger {
	private bot: Bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}

	public warn(message: string) {
		console.warn(`[ Warning ] ${message}`);
	}
}
