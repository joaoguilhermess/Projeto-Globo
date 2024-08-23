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
		this.cookie = 'glb_uid="tzuFBgVasO0k2m0IZCi-1tIWtkYIZSwSU0IcHwGBphM="; _pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAEzIEYOBWAJh44A2QQAYRADgAsggMyjJAdhABfIA; _pcid=%7B%22browserId%22%3A%22laq04vg04bqfpvd6%22%7D; cX_P=laq04vg04bqfpvd6; _cb=D9Mfm8DOgwGECZbtQh; _tt_enable_cookie=1; _ttp=RXAtNn2layqgHCAa0z3A4Z3bFBf; _sfid_fd4e={%22anonymousId%22:%22ae66a624ffb0e8f7%22%2C%22consents%22:[]}; _ga_GYCLBK1JRG=GS1.1.1687138648.2.1.1687138736.0.0.0; _v__chartbeat3=LefFhBnTidmD3Xsf9; _pcus=eyJ1c2VyU2VnbWVudHMiOm51bGx9; permutive-id=6ea9b0e0-287d-475b-8f9e-508e35b8232a; _evga_8981={%22uuid%22:%22ae66a624ffb0e8f7%22%2C%22puid%22:%22v2jN62y1ltIf_UcwzbET9EkzCBGM9vIgIBXpkWSiCdiRYy-5YgjSs_McaxCTkXjjjek1LByu0XMLfcyicA_THpIqWPEN6RjgPo54t8RD2ecrTwxA2QtMwd6rtuhCwxsk%22%2C%22affinityId%22:%220CX%22}; kppid=14094245420182755328; _ga_7D6HZKQYC8=GS1.1.1698848816.1.1.1698848831.0.0.0; GLBID=163937bbac38730cce16a2f508290d3ae455f66465538683736614d65684e5874497637724e707a6a69595a7458764e6a2d6c50756254474567647475664b6962656558654c5177326477786570456f765f4c6573764f30576b6c6c4a714764705470634766773d3d3a303a756c787271666f73676d6569676b616973746d62; _pubcid=c202d380-2861-4bbe-8229-fdd381626a74; _pubcid_cst=zix7LPQsHA%3D%3D; _ig=f7cef98b-06d9-4a0b-8d3e-a3c556161ee5; __tbc=%7Bkpex%7D5OKnZb7B7s8-xVb88rPtJ-zmjvdm8IyyuNLlfJNpScfOfe97V6sqLXT1dCNQV9W9; xbc=%7Bkpex%7DGovG88p54y8Na6nQT42eVk3kUd-naQRc-5_6NF6z0hokiwW-i02O_BsOSsrXG90x-WlYl5a_pHIj2sOPt5qAsN3GSYtchNitzOTfwkPXjtIaOrhn10A28ey5lVIX8CX8B4goouLfqknNAwXKPss739vcpOmuxSRmeFBcf_J8LHp6TVzNG5cIRKoqHy-l5nMTYs5FceZ1pwFGYKrThaLzaj7_itQq8LAY-tJjQYHxWHgpDT7ln6C-Fy_DNgULzrtlBAYp03lqJEUoIhbaQ-jijkthg4qvScQIs2_FXNPN28y4GCEmT1aAIqjbQ-9f79Y0WW3WWzKb48L5t3Pma9f72vGiVsFK072ZZqzNtQC0HHcrxyPbI8041v7x2GoxbWmCJMf6npMrziy9weWgIGBjX_lT1srPjNBcAZfEq27PJwkhRfBDipZuRyakzygT4yfMejyiEe6LhSOLDGU2AE0x2Ixr6ADVPxvv_hT0_7cT5veYrlGGa32lICZhXF5HFFqBfkV7zmRHuIRzy3IT7_phHj509buy_eukx4_fDUO27BtMD0L0VtaUY6bfLaNMPAn2ix3ZJdKR5ymDfEipj2nfN-brITtL13mKoTF4bZXGRknqPihHPVgN9s2AjDlJLtywvugw-bJEdLPdHLfQeuguigyvDLljTfVYRD2VJ1UePUBG0e8i_PJwfAFCg4Y1WUDqK1C02NBhfY9G7KAxaLlS78ajAKFKIz5pEc5gnJ6Ef3Dt7AY-4WMtbCX23Edp63SNhFmBoN_Xp3SpSrsXM1uIfYJq1WAqL1VmLG02A3hg_GydjmYvEgHCFF9omGkrA8F9; _ga_SL5WEXQ2G6=GS1.1.1699835994.6.1.1699838245.0.0.0; __utma=100629313.684879377.1664991080.1698848767.1700010141.8; _clck=3wi0ft%7C2%7Cfi7%7C0%7C1265; _ga_W1G9LMC88G=GS1.1.1704592709.1.1.1704592718.0.0.0; _ga_4DF8YFDHV7=GS1.1.1706627719.20.1.1706627719.0.0.0; _chartbeat2=.1664991079915.1706627719971.1010000000000001.nEGSI5XUYfC-6IMQBBtcMnCHr1Jt.1; cto_bidid=vHTvRF9FeTViUlVwQ09oS2RKbXhuamcwNCUyRjcwc2xrbk1jYnlCblFqeUJLMUVwc1NYb1JjdmtPUjF2YmF1eHpZRlJwSG5lcjc4OEpCVjJIM3dXZnlEWnFxcXNBJTNEJTNE; gpixel_uid=tzuFBgVasO0k2m0IZCi-1tIWtkYIZSwSU0IcHwGBphM=; _gcl_au=1.1.1859514286.1712625229; cookie-banner-consent-accepted=true; cookie-banner-accepted-version=1.4.2.2; GLOBO_ID=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJnbG9ib0lkIjoiZjdjZWY5OGItMDZkOS00YTBiLThkM2UtYTNjNTU2MTYxZWU1IiwgInVzZXJOYW1lIjoiSmcgZ2FtZXBsYXkiLCAicGhvdG9VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUF1RTdtQm9yVUcyS0hDYi1YSlYxUEd6cHZKWWFzNXp3YkJzWEE1N2JTeUdJUT1zOTYtYyJ9.AZyINOx1rhIs31g5sh_BVvx6nr1YWG8qYrkIjyAr8WB3sH4zD2VVfOtTTgazWAS--RQXR20jwBd-2bqOWUtsgNzezfHg_dJwNFj-puWzI24iIwe1rodY8iprjtT_78fB6YgTDatqf3c6jbH4zwoCDG5MupboY56yNQygybPt9a66u0G9SP5AG0IeGN3ObtuFkZ-aWJZtExEaxufJk8_qwP-88nxDsTnXxaxJVdC8ZPr3AZlYkM9VCkIZTQA8Tr5k_1KfzRDVvAUPhSm9tCz7bRL9sI0y-nFH_-91ZU4G7488xgXzDBWsDrHQzQTkumh4mr8kWzWcW0v4OunHmB99XA; _ga_G5YX0X0P68=GS1.1.1714784754.2.1.1714784770.44.0.0; utag_main=v_id:0183a933aa72000e74d3a36066eb0506f008c0670086e$_sn:10$_se:2$_ss:1$_st:1714786570956$ses_id:1714784770956%3Bexp-session$_pn:1%3Bexp-session; _fbp=fb.1.1715980391258.1378017013; __gads=ID=d61eb9eb1d3d7448:T=1715980395:RT=1715980395:S=ALNI_MbbKTFXWKd15kVVEh1Sa6y77muo2w; _cc_id=3a7a4858ddfc98cdddbdaae70e9b20b0; panoramaId_expiry=1716680985712; panoramaId=c07426058f932f2d42d366614765185ca02ca58f8415459e63bad393c0c4d239; panoramaIdType=panoDevice; _gid=GA1.2.1044359036.1716163793; GBID=GBID.1716226642547.07bc4b7c-24f5-420a-9bd4-a6b3d636d7f3; GLBEXP=xhQUjLF63dfqGhthUGJfuG13TFCLuzLW/Lanm8qi4F35qFpPM/WVk2mtjPwinDz8; hsid=c489a502-2539-458e-b9f4-a2430d38eeb0; nav13574=1471d65c82a601939b9748471b10|2_142_12:4:1:11:14:5:2_197685:2:2:44:2379-2536-95-15-2586:1:4; FCNEC=%5B%5B%22AKsRol-4OH47BZ8YZ8BZ45JbZSjRohiPc5t7EIFOUQ-faAL9log-PyOzPVWd9CLmHxBrYPm1U0Fg8yocOlh-m9Swff_odoqLwHrfXzIFpKMWvRPHpXNoX6GWlA6LVvVqq6VGWqaDUEifj_1rdys9-XO4q4ijEZFRcw%3D%3D%22%5D%2Cnull%2C%5B%5B5%2C%22905%22%5D%5D%5D; _gat_playerTracker1=1; _gat_productTracker1=1; _ga_5401XJ0K8J=GS1.1.1716227591.79.0.1716227591.60.0.0; cto_bundle=0vTM419UM0VwYlQlMkI2NHIyNHFNRUslMkZBd3QwMDl3ZHUyaW5abWN0dHFGbW04bUkxNkw2SW9HcnA4WHZqaTExZCUyRkx5M01na2JkRUxySyUyQk5kendjMmE3WGVpd1BKJTJCaDBZRTNVbXJxVHY0TjVvM2pHd1YwYXdvT2JIMXQycnFMS3glMkZkZ3RMYVREcmVSUDFoNiUyRjdaJTJGSGFWT3JsbVd3JTNEJTNE; _dc_gtm_UA-296593-56=1; _ga_WLHSK1RZ32=GS1.1.1716226646.98.1.1716227595.60.0.0; _ga=GA1.2.3501188542.1683300596';

		this.port = 5000;

		this.started = {};

		// this.showLog = true;

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

				this.log("t1", Date.now() - n);

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

					Globo.log("t2", Date.now() - n);

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

				Globo.log("t3", Date.now() - n);

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

				Globo.log("t4", Date.now() - n);

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

		var chromecast = await this.search();

		var u = "http://" + ip + ":" + this.port;

		this.log(u);

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