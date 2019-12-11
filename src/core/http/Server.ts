import http, {
	Server as HTTPServer,
	ServerResponse,
	IncomingMessage,
} from "http";

import Response from "./Response";
import Request from "./Request";

import Router from "./Router";
import Route from "./Route";

class Server {
	private httpServer: HTTPServer;

	private routers: Router[];

	constructor() {
		this.httpServer = http.createServer((req, res) =>
			this.handleRequest(req, res),
		);
		this.routers = [];
	}

	public async listen(port: number) {
		this.httpServer = this.httpServer.listen(port);
		if (this.httpServer.listening) return;
	}

	public registerRouter(router: Router) {
		this.routers = [router, ...this.routers];
	}

	private handleRequest(request: IncomingMessage, response: ServerResponse) {
		const req = new Request(request);
		const res = new Response(response);

		const segments = req.url.split("/");
		console.log(segments);
		this.routers.forEach(router => {
			const matched: { segment: string; index: number }[] = [];

			segments.forEach((segment, index) => {
				if (segment && router.baseURL.includes(segment)) {
					matched.push({ segment, index });
				}
			});

			// console.log(matched);
		});

		if (false) {
			console.log("routes");
		} else {
			res.send(`cannot ${req.method} ${req.url}`).end();
		}
	}
}

export default Server;
