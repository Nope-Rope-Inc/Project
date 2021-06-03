const path = require('path');
const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const koaStatic = require('koa-static');
const router = require('./router');
const config = require('../config');

const STATIC_PATH = path.join(__dirname, '..', '..', 'frontend');

const Server = {
	start() {
		const { port } = config.server;

		const app = new Koa();

		app.keys = [config.server.session.secret];
		app.use(session(app));

		app.use(cors({
			credentials: true
		}));

		app.use(bodyParser());

		app.use(koaStatic(STATIC_PATH));
		app.use(router.routes());
		app.listen(port);

		// app.use(function *(){
		// 	this.set('Access-Control-Allow-Origin', '*');
		// 			});
		console.log(`=> [Server] Сервер запущений на ${port} порту`);
	}
};

module.exports = Server;
