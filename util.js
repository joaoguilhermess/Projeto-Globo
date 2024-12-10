import {v4 as uuid} from "uuid";
import {Readable} from "stream";
import Log from "./log.js";
import path from "path";
import fs from "fs";
import os from "os";

export default class Util {
	static joinPath(...args) {
		return path.join(...args);
	}

	static verifyPath(path) {
		return fs.existsSync(path);
	}

	static readStats(path) {
		return fs.lstatSync(path);
	}

	static readStream(path) {
		return fs.createReadStream(path);
	}

	static readFile(path) {
		return fs.readFileSync(path);
	}

	static readJSON(path) {
		return JSON.parse(this.readFile(path).toString());
	}

	static async delay(t = 1000) {
		await new Promise(function(resolve, reject) {
			setTimeout(resolve, t);
		});
	}

	static uuid() {
		return uuid();
	}

	static pipe(fetch, response) {
		Readable.fromWeb(fetch.body).pipe(response);
	}

	static getHost() {
		if (process.platform == "win32") {
			var interfaces = os.networkInterfaces();
			var names = Object.keys(interfaces);

			for (let i = 0; i < names.length; i++) {
				let _interface = interfaces[names[i]];

				for (let c = 0; c < _interface.length; c++) {
					let current = _interface[c];

					if (current.family == "IPv4") {
						if (!current.internal) {
							if (current.address[0] == "1") {
								Log.log("Local Address:", current.address);
								
								return current.address;
							}
						}
					}
				}
			}
		} else if (process.platform == "android") {
			return os.networkInterfaces().wlan0[1].address;
		}
	}
}