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

	static stopWatch(...args) {
		var start = performance.now();

		var context = this;

		return function() {
			context.log(...args, Math.floor(performance.now() - start) + "ms");
		};
	}
}