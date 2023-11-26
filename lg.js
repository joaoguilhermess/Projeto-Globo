import lgtv from "lgtv2";

var lg = lgtv();

lg.on("connect", function() {
	lg.request("ssap://system.launcher/launch", {
		id: "com.webos.app.browser",
		params: {
			target: "http://192.168.0.101:5000"
		}
	});
});