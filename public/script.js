class Globo {
	static Init() {
		this.video = document.querySelector("#video");
		this.source = document.querySelector("#source");
		this.clock = document.querySelector("#clock");

		this.player = videojs("video");

		this.addReload();

		this.addPlay();

		try {
			this.play();
		} catch {}

		this.addClock();
	}

	static play() {
		this.player.play();
	}

	static addReload() {
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
		}, 1000 / 2);
	}

	static addPlay() {
		var context = this;

		document.body.addEventListener("click", function() {
			context.play();
		});
	}

	static formatNumber(n, l = 2) {
		n = n.toString();

		while(n.length < l) {
			n = "0" + n;
		}

		return n;
	}

	static addClock() {
		this.updateClock();

		var context = this;

		setTimeout(function() {
			context.updateClock();

			setInterval(function() {
				context.updateClock();
			}, 1000 / 2);
		}, 1000 - Date.now().toString().slice(-3));
	}

	static updateClock() {
		var digits = this.clock.children;

		var t = new Date();

		var hour = this.formatNumber(t.getHours());
		var minute = this.formatNumber(t.getMinutes());

		digits[0].textContent = hour[0];
		digits[1].textContent = hour[1];
		digits[3].textContent = minute[0];
		digits[4].textContent = minute[1];
	}
}

Globo.Init();