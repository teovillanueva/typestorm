import RequestHandler from "./RequestHandler";

interface IParam {
	index: number;
	name: string;
}

class Route {
	public params: IParam[] = [];

	private segments: string[] = [];
	private handlers: RequestHandler[];

	constructor(
		public readonly url: string,
		public readonly method: string,
		...handlers: RequestHandler[]
	) {
		this.handlers = handlers;
		this.segments = this.url.split("/");
		this.segments.forEach((segment, index) => {
			if (this.isParam(segment)) {
				const match = segment.match(/\{([^)]+)\}/);
				if (match) {
					this.params.push({ index, name: match[1] });
				}
			}
		});
	}

	private isParam(segment: string): boolean {
		segment = segment.replace("/", "");
		return segment.startsWith("{") && segment.endsWith("}");
	}
}

export default Route;
