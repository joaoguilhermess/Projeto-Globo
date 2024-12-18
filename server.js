import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Util from "./util.js";

export default class Server {
	static Init() {
		var app = express();

		app.disable("x-powered-by");

		app.use(bodyParser.json());

		app.use(cookieParser());

		this.app = app;
	}

	static sendFile(path, response) {
		if (Util.verifyPath(path)) {
			if (Util.readStats(path).isFile()) {
				var stream = Util.readStream(path);

				var args = path.split(".");

				var extension = args[args.length - 1];

				response.contentType(extension);

				return stream.pipe(response);
			}
		}

		return response.sendStatus(404);
	}

	static registryFile(path, file) {
		var context = this;

		this.app.get(path, function(request, response) {
			context.sendFile(file, response);
		});
	}

	static registryFolder(path) {
		var context = this;

		this.app.get(path + "/*", function(request, response) {
			var args = request.url.split("/");

			var file = Util.joinPath("." + path, args.slice(2).join("/"));

			context.sendFile(file, response);
		});
	}

	static registryScript(path, script) {
		this.app.get(path, script);
	}

	static start(port, callback) {
		this.app.use(function(request, response) {
			response.sendStatus(404);
		});

		this.app.listen(port, callback);
	}
}