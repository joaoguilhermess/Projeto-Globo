export default class Log {
	static Init(show) {
		this.show = show;
	}

	static log(...args) {
		if (this.show) {
			console.log(...args);
		}
	}

	static error(...args) {
		if (this.show) {
			console.error("Error:", ...args);
		}
	}
}