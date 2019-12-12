import Request from "./Request";
import Response from "./Response";

export interface INextFunction {
    (err?: any): void;
}

export default interface RequestHandler {
    (req: Request, res: Response, next?: INextFunction): any;
}