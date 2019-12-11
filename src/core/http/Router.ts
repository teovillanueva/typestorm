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
		this.registerRoute(new Route(url, "GET", ...handlers));
	}

	public post(url: string, ...handlers: RequestHandler[]) {
		this.registerRoute(new Route(url, "POST", ...handlers));
	}

	public put(url: string, ...handlers: RequestHandler[]) {
		this.registerRoute(new Route(url, "PUT", ...handlers));
	}

	public patch(url: string, ...handlers: RequestHandler[]) {
		this.registerRoute(new Route(url, "PATCH", ...handlers));
	}

	public delete(url: string, ...handlers: RequestHandler[]) {
		this.registerRoute(new Route(url, "DELETE", ...handlers));
	}

	private registerRoute(route: Route) {
		this.routes.push(route);
	}
}

export default Router;
