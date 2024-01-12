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
		this.configFile = "./config.json";

		this.config = {};

		this.auth = "163937bbac38730cce16a2f508290d3ae455f66465538683736614d65684e5874497637724e707a6a69595a7458764e6a2d6c50756254474567647475664b6962656558654c5177326477786570456f765f4c6573764f30576b6c6c4a714764705470634766773d3d3a303a756c787271666f73676d6569676b616973746d62";
		this.cookie = 'glb_uid="tzuFBgVasO0k2m0IZCi-1tIWtkYIZSwSU0IcHwGBphM="; _pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAEzIEYOBWAJh44A2QQAYRADgAsggMyjJAdhABfIA; _pcid=%7B%22browserId%22%3A%22laq04vg04bqfpvd6%22%7D; cX_P=laq04vg04bqfpvd6; _cb=D9Mfm8DOgwGECZbtQh; _cc_id=cc30ee9e8e380a53d587917121f3384e; cookie-banner-consent-accepted=true; cookie-banner-accepted-version=1.4.2.1; __utmz=100629313.1681225317.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _tt_enable_cookie=1; _ttp=RXAtNn2layqgHCAa0z3A4Z3bFBf; _sfid_fd4e={%22anonymousId%22:%22ae66a624ffb0e8f7%22%2C%22consents%22:[]}; _ga_GYCLBK1JRG=GS1.1.1687138648.2.1.1687138736.0.0.0; _v__chartbeat3=LefFhBnTidmD3Xsf9; _pcus=eyJ1c2VyU2VnbWVudHMiOm51bGx9; compass_uid=db8705e2-2cd5-4fc1-81ff-0f14dcec4982; permutive-id=6ea9b0e0-287d-475b-8f9e-508e35b8232a; _evga_8981={%22uuid%22:%22ae66a624ffb0e8f7%22%2C%22puid%22:%22v2jN62y1ltIf_UcwzbET9EkzCBGM9vIgIBXpkWSiCdiRYy-5YgjSs_McaxCTkXjjjek1LByu0XMLfcyicA_THpIqWPEN6RjgPo54t8RD2ecrTwxA2QtMwd6rtuhCwxsk%22%2C%22affinityId%22:%220CX%22}; kppid=14094245420182755328; ___nrbi=%7B%22firstVisit%22%3A1690763722%2C%22userId%22%3A%22db8705e2-2cd5-4fc1-81ff-0f14dcec4982%22%2C%22userVars%22%3A%5B%5D%2C%22futurePreviousVisit%22%3A1697300139%2C%22timesVisited%22%3A3%2C%22userType%22%3A2%7D; _ga_7D6HZKQYC8=GS1.1.1698848816.1.1.1698848831.0.0.0; GLBID=163937bbac38730cce16a2f508290d3ae455f66465538683736614d65684e5874497637724e707a6a69595a7458764e6a2d6c50756254474567647475664b6962656558654c5177326477786570456f765f4c6573764f30576b6c6c4a714764705470634766773d3d3a303a756c787271666f73676d6569676b616973746d62; _fbp=fb.1.1699835994544.1849346309; _pubcid=c202d380-2861-4bbe-8229-fdd381626a74; _pubcid_cst=zix7LPQsHA%3D%3D; ___nrbi_1464=%7B%22firstVisit%22%3A1690763722%2C%22userId%22%3A%22db8705e2-2cd5-4fc1-81ff-0f14dcec4982%22%2C%22userVars%22%3A%5B%5D%2C%22futurePreviousVisit%22%3A1699836540%2C%22timesVisited%22%3A5%2C%22userType%22%3A2%7D; __gads=ID=f17c94176ce6ac0b:T=1677121126:RT=1699838043:S=ALNI_MZa5_3oYgqyLDz1vojLhjTLqLl0tw; __gpi=UID=000009ed12ea5485:T=1677121126:RT=1699838043:S=ALNI_Mb7szD6v5ssfhlpwKfhUEFnzbBexg; _ig=f7cef98b-06d9-4a0b-8d3e-a3c556161ee5; __tbc=%7Bkpex%7D5OKnZb7B7s8-xVb88rPtJ-zmjvdm8IyyuNLlfJNpScfOfe97V6sqLXT1dCNQV9W9; xbc=%7Bkpex%7DGovG88p54y8Na6nQT42eVk3kUd-naQRc-5_6NF6z0hokiwW-i02O_BsOSsrXG90x-WlYl5a_pHIj2sOPt5qAsN3GSYtchNitzOTfwkPXjtIaOrhn10A28ey5lVIX8CX8B4goouLfqknNAwXKPss739vcpOmuxSRmeFBcf_J8LHp6TVzNG5cIRKoqHy-l5nMTYs5FceZ1pwFGYKrThaLzaj7_itQq8LAY-tJjQYHxWHgpDT7ln6C-Fy_DNgULzrtlBAYp03lqJEUoIhbaQ-jijkthg4qvScQIs2_FXNPN28y4GCEmT1aAIqjbQ-9f79Y0WW3WWzKb48L5t3Pma9f72vGiVsFK072ZZqzNtQC0HHcrxyPbI8041v7x2GoxbWmCJMf6npMrziy9weWgIGBjX_lT1srPjNBcAZfEq27PJwkhRfBDipZuRyakzygT4yfMejyiEe6LhSOLDGU2AE0x2Ixr6ADVPxvv_hT0_7cT5veYrlGGa32lICZhXF5HFFqBfkV7zmRHuIRzy3IT7_phHj509buy_eukx4_fDUO27BtMD0L0VtaUY6bfLaNMPAn2ix3ZJdKR5ymDfEipj2nfN-brITtL13mKoTF4bZXGRknqPihHPVgN9s2AjDlJLtywvugw-bJEdLPdHLfQeuguigyvDLljTfVYRD2VJ1UePUBG0e8i_PJwfAFCg4Y1WUDqK1C02NBhfY9G7KAxaLlS78ajAKFKIz5pEc5gnJ6Ef3Dt7AY-4WMtbCX23Edp63SNhFmBoN_Xp3SpSrsXM1uIfYJq1WAqL1VmLG02A3hg_GydjmYvEgHCFF9omGkrA8F9; _ga_SL5WEXQ2G6=GS1.1.1699835994.6.1.1699838245.0.0.0; utag_main=v_id:0183a933aa72000e74d3a36066eb0506f008c0670086e$_sn:9$_se:2$_ss:0$_st:1699905849437$ses_id:1699904043188%3Bexp-session$_pn:2%3Bexp-session; __utma=100629313.684879377.1664991080.1698848767.1700010141.8; _ga_4DF8YFDHV7=GS1.1.1700008603.17.1.1700011527.0.0.0; cto_bidid=_Rbm519FeTViUlVwQ09oS2RKbXhuamcwNCUyRjcwc2xrbk1jYnlCblFqeUJLMUVwc1NYb1JjdmtPUjF2YmF1eHpZRlJwSG52ZHRyYVFVdDhmM0VsOWVCdTVEUTVnJTNEJTNE; pbjs_sharedId=30eb30cc-5bbe-4488-b3e5-3f139ab55403; pbjs_sharedId_cst=zix7LPQsHA%3D%3D; _gcl_au=1.1.315064721.1704592710; _chartbeat2=.1664991079915.1704592710253.0000000000000001.CXXGHGC6jG2m7AAkzCH86wxByYgP0.1; _clck=3wi0ft%7C2%7Cfi7%7C0%7C1265; panoramaId_expiry=1705197512642; panoramaId=aef2cc660d91978da098d09fd592185ca02c537610bc96a4b74f9e055fc76f80; panoramaIdType=panoDevice; _ga_W1G9LMC88G=GS1.1.1704592709.1.1.1704592718.0.0.0; GLOBO_ID=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJnbG9ib0lkIjoiZjdjZWY5OGItMDZkOS00YTBiLThkM2UtYTNjNTU2MTYxZWU1IiwgInVzZXJOYW1lIjoiSmcgZ2FtZXBsYXkiLCAicGhvdG9VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUF1RTdtQm9yVUcyS0hDYi1YSlYxUEd6cHZKWWFzNXp3YkJzWEE1N2JTeUdJUT1zOTYtYyJ9.AZyINOx1rhIs31g5sh_BVvx6nr1YWG8qYrkIjyAr8WB3sH4zD2VVfOtTTgazWAS--RQXR20jwBd-2bqOWUtsgNzezfHg_dJwNFj-puWzI24iIwe1rodY8iprjtT_78fB6YgTDatqf3c6jbH4zwoCDG5MupboY56yNQygybPt9a66u0G9SP5AG0IeGN3ObtuFkZ-aWJZtExEaxufJk8_qwP-88nxDsTnXxaxJVdC8ZPr3AZlYkM9VCkIZTQA8Tr5k_1KfzRDVvAUPhSm9tCz7bRL9sI0y-nFH_-91ZU4G7488xgXzDBWsDrHQzQTkumh4mr8kWzWcW0v4OunHmB99XA; _ga_G5YX0X0P68=GS1.1.1704934635.1.1.1704934643.52.0.0; GLBEXP=xhQUjLF63dfqGhthUGJfuG13TFCLuzLW/Lanm8qi4F35qFpPM/WVk2mtjPwinDz8; nav13574=1181b3c914bd46338e3476886610|2_13_12:4:1:11:14:5:2_233129-233130-101550-233131-233133:2:2:44:2379-2536-95-15-2586:1:4; _gid=GA1.2.707720911.1705080689; _dc_gtm_UA-296593-56=1; cto_bundle=sXnWwl9UM0VwYlQlMkI2NHIyNHFNRUslMkZBd3QwMW56ciUyRmVuUnNJalpLd082SW55bE1hbnFkMTRLU3dzUW1KcFJ0enhQaDI1YUNScVBMS1d3cjZLSndCOG9kT3NpZnYxR0ZWRlFReWVBbWtyUTRNdVh6V2IwM0hYOHdmSVFFNThmJTJGJTJCT3hnWDc; hsid=4d66ea72-4d3f-44da-8dd4-39b8f2185e63; FCNEC=%5B%5B%22AKsRol8H8oCx6A34tFe4WAJbEzi_ltDddHoxxZc_P27zydIAnohsbkkJM1NHGPhQshO3hkiDxVPeOFO1NkeQYmCYb4xqperW_gM0bLf9595yu5cLR1k-Kz6FuBRINuo-gKwZIzjFdExfbTfiOHPSSces8whLncTDUg%3D%3D%22%5D%2Cnull%2C%5B%5B5%2C%22905%22%5D%5D%5D; _gat_playerTracker1=1; _gat_productTracker1=1; _ga_5401XJ0K8J=GS1.1.1705080698.42.0.1705080698.0.0.0; _ga=GA1.2.3501188542.1683300596; _ga_WLHSK1RZ32=GS1.1.1705080689.46.1.1705080707.42.0.0; _hzt.interval=20000';

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
				console.log("E:", e);
			}
		}
	}

	static start() {
		this.app = express();

		this.app.use(cookieParser());

		this.app.use(express.json());

		this.app.listen(this.port, function() {
			console.log("Ready");
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
			console.log(decodeURIComponent(req.url));

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
					console.log("E:", e);
				}
			}
		});
	}

	static addSlice() {
		var context = this;

		this.app.get("/m3u8/ts/*", async function(req, res) {
			console.log(decodeURIComponent(req.url));

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
					console.log("E:", e);

					res.sendStatus(404);
				}
			// }
		});
	}

	static addStream() {
		var context = this;

		this.app.get("/m3u8/*", async function(req, res) {
			console.log(decodeURIComponent(req.url));

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
					console.log("E:", e);

					res.sendStatus(404);
				}
			// }
		});
	}

	static addPaused() {
		this.paused = 0;

		var context = this;

		this.app.get("/paused", function(req, res) {
			context.paused += 1;

			console.log("Times Paused:", context.paused);

			res.sendStatus(200);
		});
	}

	static addLog() {
		this.app.post("/log", function(req, res) {
			console.log("Log:", req.body.text);

			res.sendStatus(200);
		});
	}

	static async search(ip) {
		var chromecast = await new Promise(function(resolve, reject) {
			var dns = mdns();

			dns.on("response", function(res) {
				var list = res.additionals;

				dns.destroy();

				resolve(list[list.length - 1].data);
			});

			dns.query("_googlezone._tcp.local");
		});

		this.config = {
			"server": ip,
			"chromecast": chromecast
		}
	}

	static async cast() {
		var ip = os.networkInterfaces().Ethernet[1].address;

		if (fs.existsSync(this.configFile)) {
			this.config = JSON.parse(fs.readFileSync(this.configFile));

			if (this.config.server != ip) {
				await this.search(ip);
			}
		} else {
			await this.search(ip);
		}

		fs.writeFileSync(this.configFile, JSON.stringify(this.config, null, "\t"));

		var u = "http://" + ip + ":" + this.port;

		console.log(u);

		Cast.Init(this.config.chromecast, u);
	}
}

Main.Init();