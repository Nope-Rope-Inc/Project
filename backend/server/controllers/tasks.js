const taskService = require('../../domain/services/task');

const readMany = async (ctx) => {
	const { userId } = ctx.session;

	ctx.body = await taskService.getMany({ owner: userId });
	ctx.status = 200;
};

const readOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;

	ctx.assert(id, 400);

	const task = await taskService.getById(id);
	ctx.assert(task, 404);
	ctx.assert(task.owner._id.toString() === userId, 401);

	ctx.body = task;
	ctx.status = 200;
};

const create = async (ctx) => {
	const { userId } = ctx.session;

	ctx.body = await taskService.create({
		...ctx.request.body,
		owner: userId
	});
	ctx.status = 201;
};

const updateOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;
	ctx.assert(id, 400);

	const task = await taskService.getById(id);
	ctx.assert(task, 404);
	ctx.assert(task.owner._id.toString() === userId, 401);

	ctx.body = await taskService.updateById(id, ctx.request.body);
	ctx.status = 200;
};

const deleteOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;
	ctx.assert(id, 400);

	const task = await taskService.getById(id);
	ctx.assert(task, 404);
	ctx.assert(task.owner._id.toString() === userId, 401);

	ctx.body = await taskService.deleteById(id);
	ctx.status = 200;
};

module.exports = { readMany, readOne, create, updateOne, deleteOne };
