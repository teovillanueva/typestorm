import Core from "./core";

export default {
	Core,
};

const app = new Core.http.Server();

const apiRouter = new Core.http.Router("/api");

app.registerRouter(apiRouter);

app.listen(3000);
