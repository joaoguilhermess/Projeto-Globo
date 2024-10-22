import cookieParser from "cookie-parser";
import mdns from "multicast-dns";
import {v4 as uuid} from "uuid";
import fetch from "node-fetch";
import Cast from "./cast.js";
import express from "express";
import fs from "fs";
import os from "os";

class Globo {
	static async Init() {
		this.auth = "163937bbac38730cce16a2f508290d3ae455f66465538683736614d65684e5874497637724e707a6a69595a7458764e6a2d6c50756254474567647475664b6962656558654c5177326477786570456f765f4c6573764f30576b6c6c4a714764705470634766773d3d3a303a756c787271666f73676d6569676b616973746d62";
		this.cookie = '_pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAEzIEYOBWAJh44A2QQAYRADgAsggMyjJAdhABfIA; _pcid=%7B%22browserId%22%3A%22laq04vg04bqfpvd6%22%7D; cX_P=laq04vg04bqfpvd6; _cb=D9Mfm8DOgwGECZbtQh; _v__chartbeat3=LefFhBnTidmD3Xsf9; permutive-id=6ea9b0e0-287d-475b-8f9e-508e35b8232a; GLBID=163937bbac38730cce16a2f508290d3ae455f66465538683736614d65684e5874497637724e707a6a69595a7458764e6a2d6c50756254474567647475664b6962656558654c5177326477786570456f765f4c6573764f30576b6c6c4a714764705470634766773d3d3a303a756c787271666f73676d6569676b616973746d62; gpixel_uid=tzuFBgVasO0k2m0IZCi-1tIWtkYIZSwSU0IcHwGBphM=; cookie-banner-consent-accepted=true; GLOBO_ID=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJnbG9ib0lkIjoiZjdjZWY5OGItMDZkOS00YTBiLThkM2UtYTNjNTU2MTYxZWU1IiwgInVzZXJOYW1lIjoiSmcgZ2FtZXBsYXkiLCAicGhvdG9VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUF1RTdtQm9yVUcyS0hDYi1YSlYxUEd6cHZKWWFzNXp3YkJzWEE1N2JTeUdJUT1zOTYtYyJ9.AZyINOx1rhIs31g5sh_BVvx6nr1YWG8qYrkIjyAr8WB3sH4zD2VVfOtTTgazWAS--RQXR20jwBd-2bqOWUtsgNzezfHg_dJwNFj-puWzI24iIwe1rodY8iprjtT_78fB6YgTDatqf3c6jbH4zwoCDG5MupboY56yNQygybPt9a66u0G9SP5AG0IeGN3ObtuFkZ-aWJZtExEaxufJk8_qwP-88nxDsTnXxaxJVdC8ZPr3AZlYkM9VCkIZTQA8Tr5k_1KfzRDVvAUPhSm9tCz7bRL9sI0y-nFH_-91ZU4G7488xgXzDBWsDrHQzQTkumh4mr8kWzWcW0v4OunHmB99XA; compass_uid=05c18316-6933-4966-a85e-b1c683c3e5e8; _gcl_au=1.1.345376565.1723226063; _sfid_fd4e={%22anonymousId%22:%22182ee47214a5a570%22%2C%22consents%22:[]}; _evga_8981={%22uuid%22:%22182ee47214a5a570%22%2C%22puid%22:%22uGG6BWH1ODmBoTIR0X0ve2QGOj8RVG679PEDoEyXRcr13o-yMOGu5M2tQzsTtyTjQSoP4QpF0s9MmF105aP9njA4qvJX_nPRv_Cq50TlWbHqrEfqeHqP6O9_77Mdxhyc%22%2C%22affinityId%22:%220CX%22}; kppid=272141362115922065118; _tt_enable_cookie=1; _ttp=-0sPIB5yD3gLK_b-yp8ZymGnxhk; _cc_id=f782c65e79f8f16f99db0f75e8d6641e; _ig=f7cef98b-06d9-4a0b-8d3e-a3c556161ee5; __gads=ID=c729197402794066:T=1725153781:RT=1725153781:S=ALNI_MbvqTxQmiCSqD6C-cJUkxFMCpRgZA; __gpi=UID=00000a4ecefd82c4:T=1725153781:RT=1725153781:S=ALNI_MbIQjmzbbKWgT6Sn7XTC3KqP0q2Ng; __eoi=ID=1f271ddcb1bfc5c8:T=1725153781:RT=1725153781:S=AA-AfjYn7M0OAA61yzvjZVPjHILk; ___nrbi_1464=%7B%22firstVisit%22%3A1719539702%2C%22userId%22%3A%2205c18316-6933-4966-a85e-b1c683c3e5e8%22%2C%22userVars%22%3A%5B%5D%2C%22futurePreviousVisit%22%3A1725153795%2C%22timesVisited%22%3A2%2C%22userType%22%3A2%7D; _fbp=fb.1.1725153795851.437615437648866863; connectId={"ttl":86400000,"lastUsed":1725153803087,"lastSynced":1725153803087}; __tbc=%7Bkpex%7D5OKnZb7B7s8-xVb88rPtJ-zmjvdm8IyyuNLlfJNpScfOfe97V6sqLXT1dCNQV9W9; xbc=%7Bkpex%7DVN9_giiWn_ltFIglGdo6VS_TIVedJ1e6g8q33nSaTIw9nu7ppV3JVoLgzvugC1Xm5syHMl4ATB9lkMNCq_HapQ; _pcus=eyJ1c2VyU2VnbWVudHMiOnsiQ09NUE9TRVIxWCI6eyJzZWdtZW50cyI6WyJMVHM6ODNmZDM5NjNlMzg3M2NkYjZiMDg3MjBkNWNkZGYwODk5OTgxZGUxMDpub19zY29yZSJdfX19; _ga_SL5WEXQ2G6=GS1.1.1725153795.1.1.1725153810.45.0.0; cX_G=cx%3A14w201agjq35v1sj2stmeag3w1%3A4zsnw52yudbj; glb_uid="yEq0Jxk4LzLVb8xiIZYeI6WbvJhW9sZCRB--l-RQMlM="; cookie-banner-accepted-version=1.4.2.4; ___nrbi=%7B%22firstVisit%22%3A1726445076%2C%22userId%22%3A%2205c18316-6933-4966-a85e-b1c683c3e5e8%22%2C%22userVars%22%3A%5B%5D%2C%22futurePreviousVisit%22%3A1728224569%2C%22timesVisited%22%3A2%7D; _clck=1lrpsya%7C2%7Cfps%7C0%7C1720; _chartbeat2=.1664991079915.1728224589537.0000000000000001.DEgf854l-ueDMe14lCWgFUPBxccFd.3; cto_bidid=U_kGXV9FeTViUlVwQ09oS2RKbXhuamcwNCUyRjcwc2xrbk1jYnlCblFqeUJLMUVwc1NYb1JjdmtPUjF2YmF1eHpZRlJwSG5pOEczVnB4UEhRcXZpM3Jod0o2TnJGdEE0MzdkTElRWktnZzQxTzA4dVBZJTNE; _scor_uid=ace453259cd542d8b971882d07f286a0; _gid=GA1.2.1683186746.1729616124; panoramaId_expiry=1729702526564; panoramaId=87c7fb40fc6a2c0fbfd4af0acfffa9fb927a4f61d8aa2b2c06690d3344389b12; panoramaIdType=panoDevice; GBID=GBID.1729621406284.fe41d93e-3a5c-4bf9-bb7e-7fd8022bcb15; hsid=057d76c4-d691-4e17-b19f-f2293b485a2d; _ga_5401XJ0K8J=GS1.1.1729621448.19.0.1729621448.60.0.0; _ga=GA1.2.3501188542.1683300596; FCNEC=%5B%5B%22AKsRol_VdrfY6IIUGYsZkV6CENjEaZztWDYEDYiSCLh5pP6q_Nb9HZU0_kQz5JdpuZKkvYzzf_dvwgME0SPO9hePIxo6rIes89tO6Dogjgsou9UIC-fK59ZS2Zz6-eZyY68CQ5lznq5CCIS5LXfhOnBqZEzTCm7IRQ%3D%3D%22%5D%5D; cto_bundle=Yx3NLV9UM0VwYlQlMkI2NHIyNHFNRUslMkZBd3QwNFhLRlJmYnA4QmMlMkZENkpQV1I0dWZ4JTJGQ3FscUt5NnlqcCUyRjhvR25oJTJCdUI2aDVVMHBFeW5vY3RkS0kzWjdWeDJPelk5d09WVzA3U3N6SDd2QXkxTW1aN2VyVVBsdU9Mb3I0ZzllaCUyQkNUdkFWMWRMdXlOdllIeVRCV1FwblkxMm5zZyUzRCUzRA; _ga_WLHSK1RZ32=GS1.1.1729621416.21.1.1729621854.60.1.1259116013';

		this.port = 5000;

		this.started = {};

		this.showLog = true;

		this.start();

		this.addIndex();

		await this.getBase();

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

				this.log("Try 1");

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

				this.log("Try 1", Date.now() - n);

				return;
			} catch (e) {
				this.log("E:", e);

				await new Promise(function(resolve, reject) {
					setTimeout(resolve, 1000);
				});
			}
		}
	}

	static start() {
		this.app = express();

		this.app.use(cookieParser());

		this.app.use(express.json());

		this.app.listen(this.port, function() {
			Globo.log("Ready");
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
			while (true) {
				try {
					var n = Date.now();

					Globo.log("Try 2");
					
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

					Globo.log("Try 2", Date.now() - n);

					return;
				} catch (e) {
					Globo.log("E:", e);
				}
			}
		});
	}

	static addSlice() {
		var context = this;

		this.app.get("/m3u8/ts/*", async function(req, res) {
			var url = decodeURIComponent(req.url).split("/")[3];

			try {
				var n = Date.now();

				Globo.log("Try 3");

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

				Globo.log("Try 3", Date.now() - n);

				return;
			} catch (e) {
				Globo.log("E:", e);

				res.sendStatus(404);
			}
		});
	}

	static addStream() {
		var context = this;

		this.app.get("/m3u8/*", async function(req, res) {
			var url = decodeURIComponent(req.url).split("/")[2];

			try {
				var n = Date.now();

				Globo.log("Try 4");

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

				Globo.log("Try 4", Date.now() - n);

				return;
			} catch (e) {
				Globo.log("E:", e);

				res.sendStatus(404);
			}
		});
	}

	static addPaused() {
		this.paused = {};

		var context = this;

		this.app.get("/paused", function(req, res) {
			var session = req.cookies.session;

			if (!Globo.paused[session]) {
				Globo.paused[session] = 0;
			}

			Globo.paused[session] += 1;

			Globo.log("Times", "Paused:", Globo.paused[session], session);

			res.sendStatus(200);
		});
	}

	static addLog() {
		this.app.post("/log", function(req, res) {
			Globo.log("Log:", req.body.text);

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
		var ip;

		if (process.platform == "win32") {
			let interfaces = os.networkInterfaces();
			let names = Object.keys(interfaces);

			for (let i = 0; i < names.length; i++) {
				let int = interfaces[names[i]];

				for (let k = 0; k < int.length; k++) {
					if (int[k].cidr.split("/")[1] == "24") {
						ip = int[k].address;
					}
				}
			}
		} else if (process.platform == "android") {
			ip = os.networkInterfaces().wlan0[1].address;
		} else {
			console.log("Not Casting");
			return;
		}

		var u = "http://" + ip + ":" + this.port;

		this.log(u);

		this.log("Searching for Chromecast...");

		var chromecast = await this.search();

		this.log("Casting...");

		Cast.Init(chromecast, u, function(...args) {
			Globo.log(...args);
		});
	}

	static log(...args) {
		if (this.showLog) {
			console.log(...args);
		}
	}
}

Globo.Init();