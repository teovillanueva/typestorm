import RequestHandler from "./RequestHandler";
import Request from "./Request";
import Response from "./Response";

interface IParam {
	index: number;
	name: string;
}

class Route {
	public params: IParam[] = [];

	private handlers: RequestHandler[];

	constructor(
		public readonly url: string,
		public readonly method: string,
		...handlers: RequestHandler[]
	) {
		this.handlers = handlers;
	}

	public handleRequest(req: Request, res: Response) {
		this.handlers[0](req, res);
	}

	// public pipeRequestToHandlers(req: Request, res: Response) {
	// 	const boundHandlers = this.handlers.map((f, i, arr) => f.bind(null,req,res, arr[i+1]()));
	// }

}

export default Route;
