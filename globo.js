import Server from "./server.js";
import Util from "./util.js";
import Log from "./log.js";

export default class Globo {
	static async Init() {
		this.file = "globo.json";

		this.read();

		this.started = {};

		await this.getBase();

		this.addPlaylist();

		this.addSlice();

		this.addStream();
	}

	static read() {
		this.data = {
			auth: "",
			cookie: ""
		}

		if (Util.verifyPath(this.file)) {
			try {
				this.data = Util.readJSON(this.file);
			} catch {}
		}
	}

	static async getBase() {
		while (true) {
			try {
				var stopWatch = Log.stopWatch("Base Url");

				var f = await fetch("https://playback.video.globo.com/v4/video-session", {
					"headers": {
						"accept": "*/*",
						"accept-language": "en-US,en;q=0.9",
						"authorization": "Bearer " + this.data.auth,
						"cache-control": "no-cache",
						"content-type": "application/json",
						"cookie": this.data.cookie
					},
					"body": "{\"player_type\":\"desktop\",\"video_id\":\"4452349\",\"quality\":\"max\",\"content_protection\":\"widevine\",\"vsid\":\"c62efc75-c498-6a55-ddc7-acf22640b3a0\",\"tz\":\"-03:00\"}",
					"method": "POST"
				});

				var json = await f.json();

				this.baseUrl = json.sources[0].url.split("/").slice(0, -1).join("/") + "/";

				stopWatch();

				return;
			} catch (e) {
				Log.error(e);

				await Util.delay();
			}
		}
	}

	static addPlaylist() {
		var context = this;

		Server.registryScript("/playlist.m3u8", async function(request, response) {
			while (true) {
				try {
					var stopWatch = Log.stopWatch("Playlist");

					var f = await fetch(context.baseUrl + "playlist.m3u8", {
						"headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
							"cookie": context.data.cookie
						}
					});

					var text = await f.text();

					text = text.split("globo-ser-audio_1").join("m3u8/globo-ser-audio_1");

					text = text.split("m3u8/globo-ser-audio_1=96000-video=2262976.m3u8")[1];

					response.set("Cache-Control", "private, max-age=0, no-cache");

					var session = Util.uuid();

					response.cookie("session", session);

					context.started[session] = false;

					response.send(text);

					stopWatch();

					return;
				} catch (e) {
					Log.error(e);

					await Util.delay(1000/2);
				}
			}
		});
	}

	static addSlice() {
		var context = this;

		Server.registryScript("/m3u8/ts/*", async function(request, response) {
			try {
				var stopWatch = Log.stopWatch("Slice");

				var f = await fetch(context.baseUrl + decodeURIComponent(request.url).split("/")[3], {
					"headers": {
						"accept": "*/*",
						"accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
						"cookie": context.data.cookie
					}
				});

				response.set("Cache-Control", "private, max-age=0, no-cache");
				response.set("Content-Type", "video/MP2T");

				response.on("finish", stopWatch);

				Util.pipe(f, response);
			} catch (e) {
				Log.error(e);

				response.sendStatus(500);
			}
		});
	}

	static addStream() {
		var context = this;

		Server.registryScript("/m3u8/*", async function(request, response) {
			try {
				var stopWatch = Log.stopWatch("Stream");

				var f = await fetch(context.baseUrl + decodeURIComponent(request.url).split("/")[2], {
					"headers": {
						"accept": "*/*",
						"accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
						"cookie": context.data.cookie
					}
				});

				var text = await f.text();

				text = text.split("globo-ser-audio_1").join("ts/globo-ser-audio_1");

				var current = text.split("\n");

				current = current[current.length - 2];

				var session = request.cookies.session;

				if (!context.started[session]) {
					text = text.split("\n");

					text = text.slice(0, -(1 + (2 * 12)));

					text.push("");

					text = text.join("\n");

					context.started[session] = true;
				}

				response.set("Cache-Control", "private, max-age=0, no-cache");
				
				response.send(text);

				stopWatch();
			} catch (e) {
				Log.error(e);

				response.sendStatus(500);
			}
		});
	}
}