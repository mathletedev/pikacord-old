export default class Logger {
	public info(message: string) {
		console.log(`${this.time} Info | ${message}`);
	}

	public warn(message: string) {
		console.warn(`${this.time} Warning | ${message}`);
	}

	public error(message: string, err?: any) {
		console.error(`${this.time} ERROR | ${message}`);
		console.error(err);
	}

	private get time() {
		const now = new Date();

		return `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;
	}
}
