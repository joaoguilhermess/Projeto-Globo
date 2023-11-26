import mdns from "multicast-dns";

class Search {
	static Init() {
		this.dns = mdns();

		this.dns.on("response", function(res) {
			console.log(res);
		});

		this.dns.query({});
	}
}

Search.Init();