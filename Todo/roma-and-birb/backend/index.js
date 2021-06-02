const DB = require('./db');
const Server = require('./server');

const bootstrap = async () => {
	await DB.init();
	await Server.start();
};

bootstrap();
