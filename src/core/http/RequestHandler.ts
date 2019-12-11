import Request from "./Request";
import Response from "./Response";

type RequestHandler = (req: Request, res: Response, next?: void) => void;

export default RequestHandler;
