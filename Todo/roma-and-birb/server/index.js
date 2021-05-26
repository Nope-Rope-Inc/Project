const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const config = require('../config');

const Server = {
	start() {
		const { port } = config.server;

		const app = new Koa();

		app.keys = [config.server.session.secret];
		app.use(session(app));
		app.use(bodyParser());

		app.use(router.routes());
		app.listen(port);

		console.log(`=> [Server] Сервер запущений на ${port} порту`);
	}
};

module.exports = Server;
