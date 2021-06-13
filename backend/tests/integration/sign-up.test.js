const supertest = require('supertest');
const config = require('../../config');
const userService = require('../../domain/services/user');
const Server = require('../../server');
const DB = require('../../db');

let request;
let user;

beforeAll(async () => {
	await DB.init(config.db.url);
	Server.start();
	request = supertest(Server.app);
});

afterAll(async () => {
	await userService.deleteById(user._id);
	await DB.disconnect();
	Server.stop();
});

test('Sign Up', async () => {
	const userData = {
		name: 'birb',
		email: 'birb@gmail.com',
		password: 'birb'
	};

	const res = await request.post('/sign-up').send(userData);
	user = await userService.getOne({
		name: userData.name,
		email: userData.email
	});

	const passed = res.status === 201 && !!user;
	expect(passed).toBeTruthy();
});
