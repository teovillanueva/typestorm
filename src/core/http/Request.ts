import http, { IncomingMessage } from "http";

class Request {
	public readonly method: string;
	public readonly url: string;
	public params: {[key: string]: string} = {};

	private req: IncomingMessage;

	constructor(request: IncomingMessage) {
		this.req = request;
		this.method = (request.method as string);
		this.url = request.url as string;
	}
}

export default Request;
