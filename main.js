import cookieParser from "cookie-parser";
import mdns from "multicast-dns";
import {v4 as uuid} from "uuid";
import fetch from "node-fetch";
import Cast from "./cast.js";
import express from "express";
import fs from "fs";
import os from "os";

class Main {
	static async Init() {
		this.auth = "163937bbac38730cce16a2f508290d3ae455f66465538683736614d65684e5874497637724e707a6a69595a7458764e6a2d6c50756254474567647475664b6962656558654c5177326477786570456f765f4c6573764f30576b6c6c4a714764705470634766773d3d3a303a756c787271666f73676d6569676b616973746d62";
		this.cookie = 'glb_uid="NBEcZ0ecTyEiMajOvTT6CHpUj3beFuyfe_BIdIjOB0g="; _gcl_au=1.1.529128970.1712885249; _evga_8981={%22uuid%22:%228f5dabfd7471627e%22}; _sfid_fd4e={%22anonymousId%22:%228f5dabfd7471627e%22%2C%22consents%22:[]}; GLBEXP=46WCOBmOS3Lm6X5+wIV90i3zRbjMg+LHjFKJlAPc5Ig=; _gid=GA1.2.1841900867.1712885250; kppid=13469099384473525512; hsid=676aca72-5b91-437e-8976-70baf29fa7d1; _tt_enable_cookie=1; _ttp=QPXXFJ6DASlTlTCXldJ2QC0icQp; gpixel_uid=NBEcZ0ecTyEiMajOvTT6CHpUj3beFuyfe_BIdIjOB0g=; _cc_id=5f7b1d157fd9b7d12467990a3be21215; panoramaId_expiry=1713490052027; panoramaId=01572c920b0222f8d9877a26194b185ca02c0a0ae78acb512caf92ee139b3ee0; panoramaIdType=panoDevice; nav13574=147666134aedc7dd57e4df6fe410|2_103; TID="globo.com/:-er3KRRG7Gk"; KC_RESTART_URL="aHR0cHM6Ly9pZC5nbG9iby5jb20vYXV0aC9yZWFsbXMvZ2xvYm8uY29tL3Byb3RvY29sL29wZW5pZC1jb25uZWN0L2F1dGg/Y2xpZW50X2lkPWdsb2JvcGxheS13ZWJAZ2xvYm9pZC1jb25uZWN0JnJlZGlyZWN0X3VyaT1odHRwczovL2dsb2JvcGxheS5nbG9iby5jb20vY2FsbGJhY2suaHRtbCZzdGF0ZT05YWYwYTc0YS1lOGMyLTRiMmMtODUyMi02MzE5ZTZmZjJiMjgmcmVzcG9uc2VfbW9kZT1mcmFnbWVudCZyZXNwb25zZV90eXBlPWNvZGUmc2NvcGU9b3BlbmlkJm5vbmNlPWQ3NWFjMjkwLTU1NDYtNGQ5Yi04MDEzLTEzMjE3YzJlNGZlOCZjb2RlX2NoYWxsZW5nZT1jMkVodDF1bV94eVpDdktnNmZOWFEzRU12dzhQNWN2dmtlOC1vY3VDb3c4JmNvZGVfY2hhbGxlbmdlX21ldGhvZD1TMjU2JnByb21wdD1sb2dpbg=="; _ga_G5YX0X0P68=GS1.1.1712885254.1.1.1712885290.24.0.0; GLBID=14d7118f3d0da541e5e8836e590ed0c704369647a476e6f436e34525f514132554874336f5868346755687041496e627763505046366572554a395145754e534c462d79755a495562726f43454c6376344163482d51474166796e466d575f434c5071685a62773d3d3a303a756c787271666f73676d6569676b616973746d62; GLOBO_ID=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJnbG9ib0lkIjoiZjdjZWY5OGItMDZkOS00YTBiLThkM2UtYTNjNTU2MTYxZWU1IiwgInVzZXJOYW1lIjoiSmcgZ2FtZXBsYXkiLCAicGhvdG9VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUF1RTdtQm9yVUcyS0hDYi1YSlYxUEd6cHZKWWFzNXp3YkJzWEE1N2JTeUdJUT1zOTYtYyJ9.AZyINOx1rhIs31g5sh_BVvx6nr1YWG8qYrkIjyAr8WB3sH4zD2VVfOtTTgazWAS--RQXR20jwBd-2bqOWUtsgNzezfHg_dJwNFj-puWzI24iIwe1rodY8iprjtT_78fB6YgTDatqf3c6jbH4zwoCDG5MupboY56yNQygybPt9a66u0G9SP5AG0IeGN3ObtuFkZ-aWJZtExEaxufJk8_qwP-88nxDsTnXxaxJVdC8ZPr3AZlYkM9VCkIZTQA8Tr5k_1KfzRDVvAUPhSm9tCz7bRL9sI0y-nFH_-91ZU4G7488xgXzDBWsDrHQzQTkumh4mr8kWzWcW0v4OunHmB99XA; utag_main=v_id:018ecfeb595100504a72d06d408c0506f016d0670086e$_sn:1$_ss:1$_st:1712887091346$ses_id:1712885291346%3Bexp-session$_pn:1%3Bexp-session; cto_bundle=MQUhM19sSmtHeGVLU2tSRmZ5Q0xaYWhaTTlQdWtXQVRUWllyJTJCQWFhbjNUSTVuQ0FWeTIwNUZ4NFgxVE1LWFV5YkslMkJJQlZuVUJ2Z1hBMzROb2J2MU16UTMlMkIlMkZOaktKY0tqeVV2aDlZRGo4Uzh5dlR0JTJGZ2xCS05QQTY0SVl6NUJSSUF4Y045eWklMkZ5VEJnbDNMMnpOQ3NiTVdodGclM0QlM0Q; _ga=GA1.2.2332842407.1712885249; permutive-id=6ea9b0e0-287d-475b-8f9e-508e35b8232a; FCNEC=%5B%5B%22AKsRol8WuK48TYMbL9rgutRbif5MoCkcnEL-VWVBFT1nL_RcusQHgUlWxBaYQ5KdTS5hk7a4m4xtXSQHls3kUhtR6R-Btqs2MHPYEeOtw9pyLJAWJlrroK1RIJEWn2s0TbERfAeM7Gdr2P2afU7OrUH-PlW8qFfSiw%3D%3D%22%5D%5D; _gat_playerTracker1=1; cookie-banner-consent-accepted=true; cookie-banner-accepted-version=1.4.2.2; _gat_playerTracker2=1; _dc_gtm_UA-296593-56=1; _gat_playerTracker3=1; _gat_productTracker3=1; _ga_WLHSK1RZ32=GS1.1.1712885250.1.1.1712885337.38.0.0';

		this.port = 5000;

		this.started = {};

		this.start();

		this.addIndex();

		this.addPlaylist();

		this.addSlice();

		this.addStream();

		this.addPaused();

		this.addLog();

		this.cast();
	}

	static async getBase() {
		var context = this;

		while (true) {
			try {
				var n = Date.now();

				// console.log("Try 1");

				var f = await fetch("https://playback.video.globo.com/v4/video-session", {
					"headers": {
						"accept": "*/*",
						"accept-language": "en-US,en;q=0.9",
						"authorization": "Bearer " + context.auth,
						"cache-control": "no-cache",
						"content-type": "application/json",
						"cookie": context.cookie
					},
					"body": "{\"player_type\":\"desktop\",\"video_id\":\"4452349\",\"quality\":\"max\",\"content_protection\":\"widevine\",\"vsid\":\"c62efc75-c498-6a55-ddc7-acf22640b3a0\",\"tz\":\"-03:00\"}",
					"method": "POST"
				});

				var json = await f.json();

				var url = json.sources[0].url.split("/").slice(0, - 1).join("/") + "/";

				this.baseUrl = url;

				// console.log("t1", Date.now() - n);

				return;
			} catch (e) {
				// console.log("E:", e);
			}
		}
	}

	static start() {
		this.app = express();

		this.app.use(cookieParser());

		this.app.use(express.json());

		this.app.listen(this.port, function() {
			// console.log("Ready");
		});
	}

	static addIndex() {
		this.app.get("/", function(req, res) {
			var stream = fs.createReadStream("./index.html");

			res.set("Cache-Control", "private, max-age=0, no-cache");

			stream.pipe(res);
		});
	}

	static addPlaylist() {
		var context = this;

		this.app.get("/playlist.m3u8", async function(req, res) {
			// console.log(decodeURIComponent(req.url));

			while (true) {
				try {
					var n = Date.now();

					// console.log("Try 2");

					await context.getBase();
					
					var f = await fetch(context.baseUrl +
						"playlist.m3u8", {
						"headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
							"cookie": context.cookie
						}
					});

					var text = await f.text();

					text = text.split("globo-ser-audio_1").join("m3u8/globo-ser-audio_1");

					text = text.split("m3u8/globo-ser-audio_1=96000-video=2262976.m3u8")[1];

					res.set("Cache-Control", "private, max-age=0, no-cache");

					var session = uuid();

					res.cookie("session", session);

					context.started[session] = false;

					res.send(text);

					// console.log("t2", Date.now() - n);

					return;
				} catch (e) {
					// console.log("E:", e);
				}
			}
		});
	}

	static addSlice() {
		var context = this;

		this.app.get("/m3u8/ts/*", async function(req, res) {
			// console.log(decodeURIComponent(req.url));

			var url = decodeURIComponent(req.url).split("/")[3];

			// while (true) {
				try {
					var n = Date.now();

					// console.log("Try 3");

					await context.getBase();

					var f = await fetch(context.baseUrl +
						url, {
						"headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
							"cookie": context.cookie
						}
					});

					res.set("Cache-Control", "private, max-age=0, no-cache");
					res.set("Content-Type", "video/MP2T");

					f.body.pipe(res);

					// console.log("t3", Date.now() - n);

					return;
				} catch (e) {
					// console.log("E:", e);

					res.sendStatus(404);
				}
			// }
		});
	}

	static addStream() {
		var context = this;

		this.app.get("/m3u8/*", async function(req, res) {
			// console.log(decodeURIComponent(req.url));

			var url = decodeURIComponent(req.url).split("/")[2];

			// while (true) {
				try {
					var n = Date.now();

					// console.log("Try 4");

					await context.getBase();

					var f = await fetch(context.baseUrl +
						url, {
						"headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
							"cookie": context.cookie
						}
					});

					var text = await f.text();

					text = text.split("globo-ser-audio_1").join("ts/globo-ser-audio_1");

					var current = text.split("\n");

					current = current[current.length - 2];

					var session = req.cookies.session;

					if (!context.started[session]) {
						text = text.split("\n");

						text = text.slice(0, -(1 + (2 * 10)));

						text.push("");

						text = text.join("\n");

						context.started[session] = true;
					}

					res.set("Cache-Control", "private, max-age=0, no-cache");
					res.send(text);

					// console.log("t4", Date.now() - n);

					return;
				} catch (e) {
					// console.log("E:", e);

					res.sendStatus(404);
				}
			// }
		});
	}

	static addPaused() {
		this.paused = {};

		var context = this;

		this.app.get("/paused", function(req, res) {
			var session = req.cookies.session;

			if (!context.paused[session]) {
				context.paused[session] = 0;
			}

			context.paused[session] += 1;

			// console.log("Times", "Paused:", context.paused[session], session);

			res.sendStatus(200);
		});
	}

	static addLog() {
		this.app.post("/log", function(req, res) {
			console.log("Log:", req.body.text);

			res.sendStatus(200);
		});
	}

	static async search() {
		return await new Promise(function(resolve, reject) {
			var dns = mdns();

			dns.on("response", function(res) {
				var list = res.additionals;

				dns.destroy();

				resolve(list[list.length - 1].data);
			});

			dns.query("_googlezone._tcp.local");
		});
	}

	static async cast() {
		if (process.platform == "win32") {
			var ip = os.networkInterfaces().Ethernet[1].address;
		} else if (process.platform == "android") {
			var ip = os.networkInterfaces().wlan0[1].address;
		} else {
			return;
		}

		var chromecast = await this.search();

		var u = "http://" + ip + ":" + this.port;

		// console.log(u);

		Cast.Init(chromecast, u);
	}
}

Main.Init();