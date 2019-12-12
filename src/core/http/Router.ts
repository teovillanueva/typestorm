import RequestHandler from "./RequestHandler";
import Route from "./Route";

class Router {
	public readonly routes: Route[] = [];

	public readonly baseURL: string;

	constructor(baseURL: string) {
		this.baseURL =
			baseURL.charAt(0) !== "/" && baseURL !== "*" ? `/${baseURL}` : baseURL;
	}

	public get(url: string, ...handlers: RequestHandler[]) {
		this.registerRoute(new Route(`${this.baseURL}${url}`, "GET", ...handlers));
	}

	public post(url: string, ...handlers: RequestHandler[]) {
		this.registerRoute(new Route(`${this.baseURL}${url}`, "POST", ...handlers));
	}

	public put(url: string, ...handlers: RequestHandler[]) {
		this.registerRoute(new Route(`${this.baseURL}${url}`, "PUT", ...handlers));
	}

	public patch(url: string, ...handlers: RequestHandler[]) {
		this.registerRoute(new Route(`${this.baseURL}${url}`, "PATCH", ...handlers));
	}

	public delete(url: string, ...handlers: RequestHandler[]) {
		this.registerRoute(new Route(`${this.baseURL}${url}`, "DELETE", ...handlers));
	}

	private registerRoute(route: Route) {
		this.routes.push(route);
	}
}

export default Router;
