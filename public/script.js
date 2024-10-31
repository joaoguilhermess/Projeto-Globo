var l = function(...args) {
	var list = [];

	for (var i = 0; i < args.length; i++) {
		if (typeof args[i] == "object") {
			list.push(JSON.stringify(args[i], null, "\t"));
		} else {
			list.push(args[i].toString());
		}
	}

	fetch("/log", {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({text: list.join(" ")})
	});
}

console.debug = l;
console.error = l;
console.info = l;
console.log = l;
console.warn = l;

class Globo {
	static Init() {
		this.video = document.querySelector("#video");
		this.source = document.querySelector("#source");

		this.player = videojs("video");

		var context = this;

		var last = 0;

		var first = true;

		setInterval(function() {
			if (last == context.video.currentTime) {
				if (!context.timeout) {
					context.timeout = setTimeout(function() {
						if (first) {
							first = false;
						} else {
							fetch("/paused");

							window.location.reload();
						}
					}, 1000 * 5);
				}
			} else {
				context.video.play();

				first = false;

				if (context.timeout) {
					clearTimeout(context.timeout);

					delete context.timeout;
				}
			}

			last = context.video.currentTime;
		}, 1000/2);
	}

	static async start() {
		this.player.play();
	}
}

document.body.onclick = function() {
	Globo.start();
}

Globo.Init();

try {
	Globo.start();
} catch {}