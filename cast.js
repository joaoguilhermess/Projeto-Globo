import cast from "castv2";

export default class Cast {
	static async Init(ip, url, log) {
		this.cast = new cast.Client();

		await this.connect(ip);

		var app = await this.getApp();

		log(app.appId, app.displayName);

		if (["E8C28D3C", "5CB45E5A"].includes(app.appId)) {
			await this.stop();
		
			await this.launch(url);
		}
	}

	static async connect(ip) {
		var context = this;

		await new Promise(function(resolve, reject) {
			context.cast.connect(ip, resolve);
		});

		this.connection = this.cast.createChannel("sender-0", "receiver-0", "urn:x-cast:com.google.cast.tp.connection", "JSON");
		this.heartbeat = this.cast.createChannel("sender-0", "receiver-0", "urn:x-cast:com.google.cast.tp.heartbeat", "JSON");
		this.receiver = this.cast.createChannel("sender-0", "receiver-0", "urn:x-cast:com.google.cast.receiver", "JSON");

		this.connection.send({type: "CONNECT"});

		setInterval(function() {
			context.heartbeat.send({type: "PING"});
		}, 5000);
	}

	static async getApp() {
		this.receiver.send({type: "GET_STATUS", requestId: 1});

		var context = this;

		var r;

		var status = await new Promise(function(resolve, reject) {
			r = resolve;
			context.receiver.on("message", resolve);
		});

		this.receiver.off("message", r);

		return status.status.applications[0];
	}

	static async stop() {
		this.receiver.send({type: "STOP", requestId: 1});

		var context = this;

		var r;

		var status = await new Promise(function(resolve, reject) {
			r = resolve;
			context.receiver.on("message", resolve);
		});

		this.receiver.off("message", r);
	}

	static async launch(url) {
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