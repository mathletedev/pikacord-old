import "dotenv-safe/config";
import Bot from "./bot";

const bot = new Bot(process.env.BOT_TOKEN!, {
	intents: ["guilds", "guildMembers", "guildPresences"]
});

bot.launch();

export default bot;
