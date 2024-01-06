import mdns from "multicast-dns";

class Search {
	static Init() {
		this.dns = mdns();

		var context = this;

		this.dns.on("response", function(res) {
			var list = res.additionals;

			console.log(list[list.length - 1].data);

			context.dns.destroy();
		});

		this.dns.query("_googlezone._tcp.local");
	}
}

Search.Init();