const userService = require('../../domain/services/user');

const signUp = async (ctx) => {
	const user = await userService.createUser(ctx.request.body);

	ctx.session.userId = user._id;
	ctx.session.authorized = true;

	ctx.body = user;
	ctx.status = 201;
};

const signIn = async (ctx) => {
	const { found, valid, userId } = await userService.validatePasswordByEmail(ctx.request.body);

	ctx.assert(found, 404);

	ctx.session.authorized = valid;

	if (valid) {
		ctx.session.userId = userId;
	}

	ctx.status = valid ? 200 : 401;
};

const check = async (ctx) => ctx.status = ctx.session.authorized ? 200 : 401;

const signOut = async (ctx) => {
	ctx.session.userId = null;
	ctx.session.authorized = false;
	ctx.status = 200;
};

const readMe = async (ctx) => {
	const { userId } = ctx.session;
	ctx.assert(userId, 401);

	const user = await userService.getUserById(userId);
	ctx.assert(user, 404);

	ctx.body = user;
	ctx.status = 200;
};

const updateMe = async (ctx) => {
	const { userId } = ctx.session;
	ctx.assert(userId, 400);

	ctx.body = await userService.updateUserById(userId, ctx.request.body);
	ctx.status = 200;
};

const deleteMe = async (ctx) => {
	const { userId } = ctx.session;
	ctx.assert(userId, 400);

	ctx.body = await userService.deleteUserById(userId);
	ctx.status = 200;
};

module.exports = { signUp, signIn, check, signOut, readMe, updateMe, deleteMe };
