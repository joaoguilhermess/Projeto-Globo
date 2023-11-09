import cookieParser from "cookie-parser";
import {v4 as uuid} from "uuid";
import fetch from "node-fetch";
import Cast from "./cast.js";
import express from "express";
import fs from "fs";
import os from "os";

class Main {
	static async Init() {
		this.auth = "1491daf45876ab95a06478897a80af1d76352413744774d314c36476f474f64353056684b325f336c686167524969744c373076536e376744446b69695071324879736379552d5134475a72646f37516f5f3968335f694d475a3764476e336b6878795a4c46413d3d3a303a756c787271666f73676d6569676b616973746d62";
		this.cookie = "glb_uid=\"tzuFBgVasO0k2m0IZCi-1tIWtkYIZSwSU0IcHwGBphM=\"; _pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAEzIEYOBWAJh44A2QQAYRADgAsggMyjJAdhABfIA; _pcid=%7B%22browserId%22%3A%22laq04vg04bqfpvd6%22%7D; cX_P=laq04vg04bqfpvd6; cX_G=cx%3A6trqb2zv495146b6armdcp6q%3A3tgymzbwxcond; _cb=D9Mfm8DOgwGECZbtQh; _cc_id=cc30ee9e8e380a53d587917121f3384e; cookie-banner-consent-accepted=true; cookie-banner-accepted-version=1.4.2.1; __utmz=100629313.1681225317.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _tt_enable_cookie=1; _ttp=RXAtNn2layqgHCAa0z3A4Z3bFBf; _sfid_fd4e={%22anonymousId%22:%22ae66a624ffb0e8f7%22%2C%22consents%22:[]}; _ga_GYCLBK1JRG=GS1.1.1687138648.2.1.1687138736.0.0.0; _v__chartbeat3=LefFhBnTidmD3Xsf9; _pcus=eyJ1c2VyU2VnbWVudHMiOm51bGx9; compass_uid=db8705e2-2cd5-4fc1-81ff-0f14dcec4982; _gcl_au=1.1.1536893661.1693015681; permutive-id=6ea9b0e0-287d-475b-8f9e-508e35b8232a; pbjs_sharedId=53c6fecc-b861-4971-840f-e78934f6e54d; _evga_8981={%22uuid%22:%22ae66a624ffb0e8f7%22%2C%22puid%22:%22v2jN62y1ltIf_UcwzbET9EkzCBGM9vIgIBXpkWSiCdiRYy-5YgjSs_McaxCTkXjjjek1LByu0XMLfcyicA_THpIqWPEN6RjgPo54t8RD2ecrTwxA2QtMwd6rtuhCwxsk%22%2C%22affinityId%22:%220CX%22}; kppid=14094245420182755328; _pc_randomCookieForPiano=cookieB; _ig=14094245420182755328; pbjs_sharedId_cst=zix7LPQsHA%3D%3D; __gads=ID=f17c94176ce6ac0b:T=1677121126:RT=1697300140:S=ALNI_MZa5_3oYgqyLDz1vojLhjTLqLl0tw; __gpi=UID=000009ed12ea5485:T=1677121126:RT=1697300140:S=ALNI_Mb7szD6v5ssfhlpwKfhUEFnzbBexg; __tbc=%7Bkpex%7D5OKnZb7B7s8-xVb88rPtJ-zmjvdm8IyyuNLlfJNpScfOfe97V6sqLXT1dCNQV9W9; __pat=-10800000; xbc=%7Bkpex%7Dsyli3sOX1SMPTBUhZtbS7k3kUd-naQRc-5_6NF6z0hokiwW-i02O_BsOSsrXG90x-WlYl5a_pHIj2sOPt5qAsN3GSYtchNitzOTfwkPXjtIaOrhn10A28ey5lVIX8CX8B4goouLfqknNAwXKPss739vcpOmuxSRmeFBcf_J8LHp6TVzNG5cIRKoqHy-l5nMTYs5FceZ1pwFGYKrThaLzaj7_itQq8LAY-tJjQYHxWHgpDT7ln6C-Fy_DNgULzrtlBAYp03lqJEUoIhbaQ-jijkthg4qvScQIs2_FXNPN28y4GCEmT1aAIqjbQ-9f79Y0WW3WWzKb48L5t3Pma9f72vGiVsFK072ZZqzNtQC0HHcrxyPbI8041v7x2GoxbWmCJMf6npMrziy9weWgIGBjX_lT1srPjNBcAZfEq27PJwkhRfBDipZuRyakzygT4yfMejyiEe6LhSOLDGU2AE0x2Ixr6ADVPxvv_hT0_7cT5veYrlGGa32lICZhXF5HFFqBfkV7zmRHuIRzy3IT7_phHj509buy_eukx4_fDUO27BtMD0L0VtaUY6bfLaNMPAn2ix3ZJdKR5ymDfEipj2nfN-brITtL13mKoTF4bZXGRknqPihHPVgN9s2AjDlJLtywvugw-bJEdLPdHLfQeuguigyvDLljTfVYRD2VJ1UePUBG0e8i_PJwfAFCg4Y1WUDqK1C02NBhfY9G7KAxaLlS78ajAKFKIz5pEc5gnJ6Ef3Dt7AY-4WMtbCX23Edp63SNhFmBoN_Xp3SpSrsXM1uIfaaqkbUh0IZJ5f8QWyLsU4v5SQYdJpzZYA5--lPkzjVh; voxusmediamanager_acs=true; ___nrbi=%7B%22firstVisit%22%3A1690763722%2C%22userId%22%3A%22db8705e2-2cd5-4fc1-81ff-0f14dcec4982%22%2C%22userVars%22%3A%5B%5D%2C%22futurePreviousVisit%22%3A1697300139%2C%22timesVisited%22%3A3%2C%22userType%22%3A2%7D; _ga_SL5WEXQ2G6=GS1.1.1697300140.5.1.1697300233.0.0.0; _clck=3wi0ft|2|ffv|0|1265; _gid=GA1.2.743313452.1698600041; __utma=100629313.684879377.1664991080.1698440672.1698848767.7; cto_bidid=b_Qn0V9FeTViUlVwQ09oS2RKbXhuamcwNCUyRjcwc2xrbk1jYnlCblFqeUJLMUVwc1NYb1JjdmtPUjF2YmF1eHpZRlJwSG5CMWE3Q1hEZUxOeXRxeUtSSlJtVktBJTNEJTNE; _ga_7D6HZKQYC8=GS1.1.1698848816.1.1.1698848831.0.0.0; _chartbeat2=.1664991079915.1698866109959.0000000000100011.twNeuCUAsnUDFw04Ro-0fwDHJmPL.1; _ga_4DF8YFDHV7=GS1.1.1698866110.13.0.1698866110.0.0.0; GLBID=163937bbac38730cce16a2f508290d3ae455f66465538683736614d65684e5874497637724e707a6a69595a7458764e6a2d6c50756254474567647475664b6962656558654c5177326477786570456f765f4c6573764f30576b6c6c4a714764705470634766773d3d3a303a756c787271666f73676d6569676b616973746d62; GLOBO_ID=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJnbG9ib0lkIjoiZjdjZWY5OGItMDZkOS00YTBiLThkM2UtYTNjNTU2MTYxZWU1IiwgInVzZXJOYW1lIjoiSmcgZ2FtZXBsYXkiLCAicGhvdG9VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUF1RTdtQm9yVUcyS0hDYi1YSlYxUEd6cHZKWWFzNXp3YkJzWEE1N2JTeUdJUT1zOTYtYyJ9.AZyINOx1rhIs31g5sh_BVvx6nr1YWG8qYrkIjyAr8WB3sH4zD2VVfOtTTgazWAS--RQXR20jwBd-2bqOWUtsgNzezfHg_dJwNFj-puWzI24iIwe1rodY8iprjtT_78fB6YgTDatqf3c6jbH4zwoCDG5MupboY56yNQygybPt9a66u0G9SP5AG0IeGN3ObtuFkZ-aWJZtExEaxufJk8_qwP-88nxDsTnXxaxJVdC8ZPr3AZlYkM9VCkIZTQA8Tr5k_1KfzRDVvAUPhSm9tCz7bRL9sI0y-nFH_-91ZU4G7488xgXzDBWsDrHQzQTkumh4mr8kWzWcW0v4OunHmB99XA; utag_main=v_id:0183a933aa72000e74d3a36066eb0506f008c0670086e$_sn:7$_se:1$_ss:1$_st:1698882156187$ses_id:1698880356187%3Bexp-session$_pn:1%3Bexp-session; panoramaId_expiry=1699056331551; nav13574=1181b3c914bd46338e3476886610|2_308_12:4:1:11:14:5:2_233133:1:2:45:2536-2379-8-95-61-15-17-106-2586-124:2:4; GLBEXP=xhQUjLF63dfqGhthUGJfuG13TFCLuzLW/Lanm8qi4F35qFpPM/WVk2mtjPwinDz8; hsid=90d72430-5979-4773-8301-fcfb04fe287f; cto_bundle=vtQZUV9UM0VwYlQlMkI2NHIyNHFNRUslMkZBd3QwJTJGN1NJeW5KbnpHOEZWTWNJSWU4b0NiRiUyQldtbmszYTB1NnE3YzdiU2olMkZMTVhjRjFjSlVJbUg2RkZDcmNsR0ZQZGtIODJGWWJtd2NEUFNFbzM1U1d1OEF6OEJGb1JkdVBDJTJCNktJNEphQUVlUg; _dc_gtm_UA-296593-56=1; FCNEC=%5B%5B%22AKsRol-QTT7o40o0d-ilydm3jJRW9jnuo83UBHKcSbJXY9zbDRE8rVo4b_D8qa78kvyC7VYpAIARhYrmWK0qlTVHKvxmbjpcFTN0aUCbUVpv7ZBI9UsGbgfRwr62RLvRAIAzBOEvizIvuHI-9_D3B5XX3NNV-P0w0Q%3D%3D%22%5D%2Cnull%2C%5B%5B5%2C%22905%22%5D%5D%5D; _gat_playerTracker1=1; _gat_productTracker1=1; _ga_5401XJ0K8J=GS1.1.1699034670.34.0.1699034670.0.0.0; _hzt.interval=16000; _ga=GA1.2.3501188542.1683300596; _ga_WLHSK1RZ32=GS1.1.1699034666.39.0.1699034677.49.0.0";

		this.port = 5000;

		this.started = {};

		this.start();

		this.addIndex();

		this.addPlaylist();

		this.addSlice();

		this.addStream();

		this.cast();
	}

	static async getBase() {
		var context = this;

		while (true) {
			try {
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

				return;
			} catch (e) {
				console.log("E:", e);
			}
		}
	}

	static start() {
		this.app = express();

		this.app.use(cookieParser());

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

			while (true) {
				try {
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

					return;
				} catch (e) {
					console.log("E:", e);
				}
			}
		});
	}

	static addStream() {
		var context = this;

		this.app.get("/m3u8/*", async function(req, res) {
			console.log(decodeURIComponent(req.url));

			var url = decodeURIComponent(req.url).split("/")[2];

			while (true) {
				try {
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

					if (context.started[session]) {
						var k = parseInt(current.split("=")[2].split("-")[1].split(".")[0]);

						for (var i = 0; i < 10; i++) {
							text += "#EXTINF:4.8, no desc\nts/globo-ser-audio_1=96000-video=3442944-" + (k + i + 1) + ".ts?start_index=2\n";
						}
					} else {
						context.started[session] = true;
					}

					res.set("Cache-Control", "private, max-age=0, no-cache");
					res.send(text);

					return;
				} catch (e) {
					console.log("E:", e);
				}
			}
		});
	}

	static cast() {
		var u = "http://" + os.networkInterfaces().Ethernet[1].address + ":" + this.port;

		console.log(u);

		Cast.Init("192.168.0.102", u);
	}
}

Main.Init();