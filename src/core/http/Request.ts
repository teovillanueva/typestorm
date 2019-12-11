import http, { IncomingMessage } from "http";

class Request {
	public readonly method: string;
	public readonly url: string;

	private req: IncomingMessage;

	constructor(request: IncomingMessage) {
		this.req = request;
		this.method = (request.method as string).toLowerCase();
		this.url = request.url as string;
	}
}

export default Request;
