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

		const routes = this.routers.reduce<Route[]>((newArr, router) => {
			newArr.push(...router.routes);
			return newArr;
		}, []);

		function getRoute(url: string) {

			let argsVal: RegExpMatchArray | null;
			let argsNames: RegExpMatchArray | null;

			const params: {[key: string]: string} = {};
		  
			for(let x = 0; x < routes.length; x++){
		  
				// tslint:disable-next-line: no-shadowed-variable
				const route = routes[x];
				const routeMatcher = new RegExp(route.url.replace(/(:\w+)/g, '([\\w-]+)'));
				
				argsVal = url.match(routeMatcher);

				if(argsVal && req.method === route.method) {

					argsVal.shift();
					argsNames = route.url.match(/(:\w+)/g);
		
					if(argsNames) {
						for(let y = 0; y < argsNames.length; y++){
							params[argsNames[y].slice(1)] = argsVal[y];
						}
					}
					req.params = params;
					return route
		
				}
		  
			}
			return null;
		}

		const route = getRoute(req.url);

		if (route) {
			route.handleRequest(req, res);
		}

		// const segments = req.url.split("/");
		// console.log(segments);
		// this.routers.forEach(router => {
		// 	const matched: { segment: string; index: number }[] = [];

		// 	segments.forEach((segment, index) => {
		// 		if (segment && router.baseURL.includes(segment)) {
		// 			matched.push({ segment, index });
		// 		}
		// 	});

		// 	// console.log(matched);
		// });

		// if (false) {

		// } else {
		// 	res.send(`cannot ${req.method} ${req.url}`).end();
		// }
	}
}

export default Server;
