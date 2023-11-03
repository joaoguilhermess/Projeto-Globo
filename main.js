import express from "express";
import fetch from "node-fetch";
import fs from "fs";

const cookie = "glb_uid=\"tzuFBgVasO0k2m0IZCi-1tIWtkYIZSwSU0IcHwGBphM=\"; _pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAEzIEYOBWAJh44A2QQAYRADgAsggMyjJAdhABfIA; _pcid=%7B%22browserId%22%3A%22laq04vg04bqfpvd6%22%7D; cX_P=laq04vg04bqfpvd6; cX_G=cx%3A6trqb2zv495146b6armdcp6q%3A3tgymzbwxcond; _cb=D9Mfm8DOgwGECZbtQh; _cc_id=cc30ee9e8e380a53d587917121f3384e; cookie-banner-consent-accepted=true; cookie-banner-accepted-version=1.4.2.1; __utmz=100629313.1681225317.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _tt_enable_cookie=1; _ttp=RXAtNn2layqgHCAa0z3A4Z3bFBf; _sfid_fd4e={%22anonymousId%22:%22ae66a624ffb0e8f7%22%2C%22consents%22:[]}; _ga_GYCLBK1JRG=GS1.1.1687138648.2.1.1687138736.0.0.0; _v__chartbeat3=LefFhBnTidmD3Xsf9; _pcus=eyJ1c2VyU2VnbWVudHMiOm51bGx9; compass_uid=db8705e2-2cd5-4fc1-81ff-0f14dcec4982; _gcl_au=1.1.1536893661.1693015681; permutive-id=6ea9b0e0-287d-475b-8f9e-508e35b8232a; pbjs_sharedId=53c6fecc-b861-4971-840f-e78934f6e54d; _evga_8981={%22uuid%22:%22ae66a624ffb0e8f7%22%2C%22puid%22:%22v2jN62y1ltIf_UcwzbET9EkzCBGM9vIgIBXpkWSiCdiRYy-5YgjSs_McaxCTkXjjjek1LByu0XMLfcyicA_THpIqWPEN6RjgPo54t8RD2ecrTwxA2QtMwd6rtuhCwxsk%22%2C%22affinityId%22:%220CX%22}; kppid=14094245420182755328; _pc_randomCookieForPiano=cookieB; _ig=14094245420182755328; pbjs_sharedId_cst=zix7LPQsHA%3D%3D; __gads=ID=f17c94176ce6ac0b:T=1677121126:RT=1697300140:S=ALNI_MZa5_3oYgqyLDz1vojLhjTLqLl0tw; __gpi=UID=000009ed12ea5485:T=1677121126:RT=1697300140:S=ALNI_Mb7szD6v5ssfhlpwKfhUEFnzbBexg; __tbc=%7Bkpex%7D5OKnZb7B7s8-xVb88rPtJ-zmjvdm8IyyuNLlfJNpScfOfe97V6sqLXT1dCNQV9W9; __pat=-10800000; xbc=%7Bkpex%7Dsyli3sOX1SMPTBUhZtbS7k3kUd-naQRc-5_6NF6z0hokiwW-i02O_BsOSsrXG90x-WlYl5a_pHIj2sOPt5qAsN3GSYtchNitzOTfwkPXjtIaOrhn10A28ey5lVIX8CX8B4goouLfqknNAwXKPss739vcpOmuxSRmeFBcf_J8LHp6TVzNG5cIRKoqHy-l5nMTYs5FceZ1pwFGYKrThaLzaj7_itQq8LAY-tJjQYHxWHgpDT7ln6C-Fy_DNgULzrtlBAYp03lqJEUoIhbaQ-jijkthg4qvScQIs2_FXNPN28y4GCEmT1aAIqjbQ-9f79Y0WW3WWzKb48L5t3Pma9f72vGiVsFK072ZZqzNtQC0HHcrxyPbI8041v7x2GoxbWmCJMf6npMrziy9weWgIGBjX_lT1srPjNBcAZfEq27PJwkhRfBDipZuRyakzygT4yfMejyiEe6LhSOLDGU2AE0x2Ixr6ADVPxvv_hT0_7cT5veYrlGGa32lICZhXF5HFFqBfkV7zmRHuIRzy3IT7_phHj509buy_eukx4_fDUO27BtMD0L0VtaUY6bfLaNMPAn2ix3ZJdKR5ymDfEipj2nfN-brITtL13mKoTF4bZXGRknqPihHPVgN9s2AjDlJLtywvugw-bJEdLPdHLfQeuguigyvDLljTfVYRD2VJ1UePUBG0e8i_PJwfAFCg4Y1WUDqK1C02NBhfY9G7KAxaLlS78ajAKFKIz5pEc5gnJ6Ef3Dt7AY-4WMtbCX23Edp63SNhFmBoN_Xp3SpSrsXM1uIfaaqkbUh0IZJ5f8QWyLsU4v5SQYdJpzZYA5--lPkzjVh; voxusmediamanager_acs=true; ___nrbi=%7B%22firstVisit%22%3A1690763722%2C%22userId%22%3A%22db8705e2-2cd5-4fc1-81ff-0f14dcec4982%22%2C%22userVars%22%3A%5B%5D%2C%22futurePreviousVisit%22%3A1697300139%2C%22timesVisited%22%3A3%2C%22userType%22%3A2%7D; _ga_SL5WEXQ2G6=GS1.1.1697300140.5.1.1697300233.0.0.0; _clck=3wi0ft|2|ffv|0|1265; _gid=GA1.2.743313452.1698600041; __utma=100629313.684879377.1664991080.1698440672.1698848767.7; cto_bidid=b_Qn0V9FeTViUlVwQ09oS2RKbXhuamcwNCUyRjcwc2xrbk1jYnlCblFqeUJLMUVwc1NYb1JjdmtPUjF2YmF1eHpZRlJwSG5CMWE3Q1hEZUxOeXRxeUtSSlJtVktBJTNEJTNE; _ga_7D6HZKQYC8=GS1.1.1698848816.1.1.1698848831.0.0.0; _chartbeat2=.1664991079915.1698866109959.0000000000100011.twNeuCUAsnUDFw04Ro-0fwDHJmPL.1; _ga_4DF8YFDHV7=GS1.1.1698866110.13.0.1698866110.0.0.0; GLBID=163937bbac38730cce16a2f508290d3ae455f66465538683736614d65684e5874497637724e707a6a69595a7458764e6a2d6c50756254474567647475664b6962656558654c5177326477786570456f765f4c6573764f30576b6c6c4a714764705470634766773d3d3a303a756c787271666f73676d6569676b616973746d62; GLOBO_ID=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJnbG9ib0lkIjoiZjdjZWY5OGItMDZkOS00YTBiLThkM2UtYTNjNTU2MTYxZWU1IiwgInVzZXJOYW1lIjoiSmcgZ2FtZXBsYXkiLCAicGhvdG9VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUF1RTdtQm9yVUcyS0hDYi1YSlYxUEd6cHZKWWFzNXp3YkJzWEE1N2JTeUdJUT1zOTYtYyJ9.AZyINOx1rhIs31g5sh_BVvx6nr1YWG8qYrkIjyAr8WB3sH4zD2VVfOtTTgazWAS--RQXR20jwBd-2bqOWUtsgNzezfHg_dJwNFj-puWzI24iIwe1rodY8iprjtT_78fB6YgTDatqf3c6jbH4zwoCDG5MupboY56yNQygybPt9a66u0G9SP5AG0IeGN3ObtuFkZ-aWJZtExEaxufJk8_qwP-88nxDsTnXxaxJVdC8ZPr3AZlYkM9VCkIZTQA8Tr5k_1KfzRDVvAUPhSm9tCz7bRL9sI0y-nFH_-91ZU4G7488xgXzDBWsDrHQzQTkumh4mr8kWzWcW0v4OunHmB99XA; utag_main=v_id:0183a933aa72000e74d3a36066eb0506f008c0670086e$_sn:7$_se:1$_ss:1$_st:1698882156187$ses_id:1698880356187%3Bexp-session$_pn:1%3Bexp-session; panoramaId_expiry=1698966834036; GLBEXP=xhQUjLF63dfqGhthUGJfuG13TFCLuzLW/Lanm8qi4F35qFpPM/WVk2mtjPwinDz8; hsid=7d34f995-5ffa-4247-a0f3-853e1ea1e16e; nav13574=1181b3c914bd46338e3476886610|2_307_4:1:11:14:5:2_1:2:45:2536-2379-8-95-61-15-17-106-2586-124:2:4; FCNEC=%5B%5B%22AKsRol8AxnXslCilfJ21_076WOeeIerW37dhs8a2KbSiOGfJt9YxKt92F_CDrt9M1Rm_CZp_zNtZ7Hq3_2xsZqXXMDCgc48dMUmLoSYE74_aj931m7sta0Oi3O2DqB9nTSxDvtA_C0ALVy0J6XxYk0Ly8OKJCmi90A%3D%3D%22%5D%2Cnull%2C%5B%5B5%2C%22905%22%5D%5D%5D; _ga=GA1.2.3501188542.1683300596; cto_bundle=wjGgnF9UM0VwYlQlMkI2NHIyNHFNRUslMkZBd3QwOHcwRmd5VDl6M0p2dFhOc1Y5M1FUcnlrQkRESllQSDJmR2k1Q05WVUFzVGxsS3BPSHYlMkZOa3VrUTY1RlExd3RVM1VOSk03V05GVWlxVHdaNm9qZERmT0l4WWdWRlBLJTJGSlBFcTVUQ0lpbWRW; _dc_gtm_UA-296593-56=1; _ga_WLHSK1RZ32=GS1.1.1698944873.36.1.1698945411.60.0.0; _ga_5401XJ0K8J=GS1.1.1698944875.31.0.1698945411.0.0.0";

var app = express();

app.get("/", function(req, res) {
	var stream = fs.createReadStream("./globo.html");

	stream.pipe(res);
});

app.get("/playlist.m3u8", async function(req, res) {
	var f = await fetch("https://live-as-08-16.video.globo.com/j/eyJhbGciOiJSUzUxMiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJjb3VudHJ5X2NvZGUiOiJCUiIsImRvbWFpbiI6ImxpdmUtYXMtMDgtMTYudmlkZW8uZ2xvYm8uY29tIiwiZXhwIjoxNjk5MDMxMzA4LCJpYXQiOjE2OTg5NDQ5MDgsImlzcyI6InBsYXliYWNrLWFwaS1wcm9kLWdjcCIsIm93bmVyIjoiZjdjZWY5OGItMDZkOS00YTBiLThkM2UtYTNjNTU2MTYxZWU1IiwicGF0aCI6Ii9udS9mKGk9MikvZ2xvYm8tc2VyL3BsYXlsaXN0Lm0zdTgifQ.DLHzt1E2eCP0CaKvQMIlj0oVC11OYumzSD2LGP86RnpDPfLYwMx8QwKzdstF0Q2bqsMsRbKKD_pr4m7hL5xzOTPdLySuJx1mWaXx7N2QjcvNockOhESloJ_-KcoeovCC2257S8iuPGI56EjK6Z3hnCHES47r0EjmpAqaKBGO6aHK46tZydGgKfUNWCojnmkMSdVUrfYDbHM67RqfnNFMfjOWm2f4u_SH495hd2zO2uMXRoB9do1RUpdn6NuoKKE6im0BQ2UI5HKfCdV-o5ZsPweywkTW7TeWydqXgYSM8gmSaaHvYl7FV5YZV2TcrDtxM3vPQWSQE_wgL0ryC3ckag/nu/f(i=2)/globo-ser/" +
		"playlist.m3u8", {
		"headers": {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
			"cookie": cookie
		}
	});

	var text = await f.text();

	text = text.split("globo-ser-audio_1").join("m3u8/globo-ser-audio_1");

	text = text.split("m3u8/globo-ser-audio_1=96000-video=2262976.m3u8")[1];

	res.send(text);
});

app.get("/m3u8/*", async function(req, res) {
	var url = decodeURIComponent(req.url).split("/")[2];

	var f = await fetch("https://live-as-08-16.video.globo.com/j/eyJhbGciOiJSUzUxMiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJjb3VudHJ5X2NvZGUiOiJCUiIsImRvbWFpbiI6ImxpdmUtYXMtMDgtMTYudmlkZW8uZ2xvYm8uY29tIiwiZXhwIjoxNjk5MDMxMzA4LCJpYXQiOjE2OTg5NDQ5MDgsImlzcyI6InBsYXliYWNrLWFwaS1wcm9kLWdjcCIsIm93bmVyIjoiZjdjZWY5OGItMDZkOS00YTBiLThkM2UtYTNjNTU2MTYxZWU1IiwicGF0aCI6Ii9udS9mKGk9MikvZ2xvYm8tc2VyL3BsYXlsaXN0Lm0zdTgifQ.DLHzt1E2eCP0CaKvQMIlj0oVC11OYumzSD2LGP86RnpDPfLYwMx8QwKzdstF0Q2bqsMsRbKKD_pr4m7hL5xzOTPdLySuJx1mWaXx7N2QjcvNockOhESloJ_-KcoeovCC2257S8iuPGI56EjK6Z3hnCHES47r0EjmpAqaKBGO6aHK46tZydGgKfUNWCojnmkMSdVUrfYDbHM67RqfnNFMfjOWm2f4u_SH495hd2zO2uMXRoB9do1RUpdn6NuoKKE6im0BQ2UI5HKfCdV-o5ZsPweywkTW7TeWydqXgYSM8gmSaaHvYl7FV5YZV2TcrDtxM3vPQWSQE_wgL0ryC3ckag/nu/f(i=2)/globo-ser/" +
		url, {
		"headers": {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
			"cookie": cookie
		}
	});

	res.set("Cache-Control", "private, max-age=0, no-cache");
	res.set("Connection", "keep-alive");
	res.set("Content-Type", "video/MP2T");

	f.body.pipe(res);
});

app.listen(5000, function() {
	console.log("Ready");
});