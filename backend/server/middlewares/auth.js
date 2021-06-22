'use strict';

module.exports = (handler) => {
	return async (ctx) => {
		ctx.assert(ctx.session.authorized, 401);
		await handler(ctx);
	}
};
