import Server from "./server.js";
import Globo from "./globo.js";
import Util from "./util.js";
import Cast from "./cast.js";
import Log from "./log.js";

class Main {
	static async Init() {
		this.port = 5000;

		// Log.Init(process.platform != "android");
		Log.Init(true);

		process.on("uncaughtException", function(e) {
			Log.log("ABSURD:", e);
		});

		Server.Init();

		Server.registryFile("/", Util.joinPath("public", "index.html"));

		Server.registryFolder("/public");

		Server.registryFile("/favicon.ico", Util.joinPath("public", "images", "favicon.ico"));

		await Globo.Init();

		var context = this;

		Server.start(this.port, async function() {
			Log.log("Ready");

			await Cast.Init("http://" + Util.getHost() + ":" + context.port);
		});
	}
}

Main.Init();