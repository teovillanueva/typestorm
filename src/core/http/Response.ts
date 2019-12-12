import http, { ServerResponse } from "http";

class Response {
	private res: ServerResponse;

	constructor(response: ServerResponse) {
		this.res = response;
	}

	public json(data: any) {
		this.res.write(JSON.stringify(data));
		return this;
	}

	public send(data: any) {
		this.res.write(data);
		return this;
	}

	public end() {
		this.res.end();
		return;
	}
}

export default Response;
