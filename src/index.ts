import Core from "./core";

export default {
	Core,
};

const app = new Core.http.Server();

const apiRouter = new Core.http.Router("/api");

apiRouter.get("/user/:id", (req, res) => {
	res.json(req.params).end();
})

apiRouter.post("/test/:ids", (req, res) => {
	res.send("Hell").end()
})

app.registerRouter(apiRouter);

app.listen(3000);