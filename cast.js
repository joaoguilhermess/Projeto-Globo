import mdns from "multicast-dns";
import Util from "./util.js";
import cast from "castv2";
import Log from "./log.js";

export default class Cast {
	static async Init(url) {
		this.cast = new cast.Client();

		await this.connect();

		var app = await this.getApp();

		if (app) {
			Log.log("Current App:", app.appId, app.displayName);
		}

		// if (["E8C28D3C", "5CB45E5A"].includes(app.appId) || app.appId == undefined) {
		if (["E8C28D3C"].includes(app.appId) || app.appId == undefined) {
			await this.stopApp();
		
			await this.launchApp(url);
		} else if (app) {
			Log.log("Ignoring App");
		}
	}

	static async search() {
		Log.log("Searching for ChromeCast");

		return await new Promise(function(resolve, reject) {
			var dns = mdns();

			dns.on("response", function(response) {
				var list = response.additionals;

				dns.destroy();

				for (let i = 0; i < list.length; i++) {
					if (typeof list[i].data == "string") {
						return resolve(list[i].data);
					}
				}
			});

			dns.query("_googlezone._tcp.local");
		});
	}

	static async connect() {
		var host = await this.search();

		Log.log("Casting To:", host);

		var context = this;

		await new Promise(function(resolve, reject) {
			context.cast.connect(host, resolve);
		});

		this.connection = this.cast.createChannel("sender-0", "receiver-0", "urn:x-cast:com.google.cast.tp.connection", "JSON");
		this.heartbeat = this.cast.createChannel("sender-0", "receiver-0", "urn:x-cast:com.google.cast.tp.heartbeat", "JSON");
		this.receiver = this.cast.createChannel("sender-0", "receiver-0", "urn:x-cast:com.google.cast.receiver", "JSON");

		this.connection.send({type: "CONNECT"});

		setInterval(function() {
			context.beat();
		}, 5000);

		this.beat();
	}

	static beat() {
		this.heartbeat.send({type: "PING"});
	}

	static async getStatus() {
		var context = this;

		var r;

		var status = await new Promise(function(resolve, reject) {
			r = resolve;
			context.receiver.on("message", resolve);
		});

		this.receiver.off("message", r);

		return status;
	}

	static async getApp() {
		this.receiver.send({type: "GET_STATUS", requestId: 1});

		var status = await this.getStatus();

		if (status.status.applications) {
			return status.status.applications[0];
		}
	}

	static async stopApp() {
		Log.log("Stopping Current App");

		this.receiver.send({type: "STOP", requestId: 1});

		await this.getStatus();
	}

	static async launchApp(url) {
		Log.log("Launching:", url);

		this.receiver.send({
			type: "LAUNCH",
			appId: "5CB45E5A",
			requestId: 1
		});

		var context = this;

		this.receiver.on("message", function(data, broadcast) {
			if (data.type == "RECEIVER_STATUS") {
				if (data.status.applications) {
					var transportId = data.status.applications[0].transportId;

					if (transportId && data.status.applications[0].statusText == "URL Cast ready...") {
						var connection = context.cast.createChannel("sender-0", transportId, "urn:x-cast:com.google.cast.tp.connection", "JSON");
						var receiver = context.cast.createChannel("sender-0", transportId, "urn:x-cast:com.url.cast");

						connection.send({type: "CONNECT"});

						receiver.send(JSON.stringify({
							type: "loc",
							url: url
						}));
					}
				}
			}
		});
	}
}