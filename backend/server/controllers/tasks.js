const taskService = require('../../domain/services/task');

const readMany = async (ctx) => {
	const { userId } = ctx.session;

	ctx.body = await taskService.getTasks({ owner: userId });
	ctx.status = 200;
};

const readOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;

	ctx.assert(id, 400);

	const task = await taskService.getTaskById(id);
	ctx.assert(task, 404);
	ctx.assert(task.owner._id.toString() === userId, 401);

	ctx.body = task;
	ctx.status = 200;
};

const create = async (ctx) => {
	const { userId } = ctx.session;

	ctx.body = await taskService.createTask({
		...ctx.request.body,
		owner: userId
	});
	ctx.status = 201;
};

const updateOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;
	ctx.assert(id, 400);

	const task = await taskService.getTaskById(id);
	ctx.assert(task, 404);
	ctx.assert(task.owner._id.toString() === userId, 401);

	ctx.body = await taskService.updateTaskById(id, ctx.request.body);
	ctx.status = 200;
};

const deleteOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;
	ctx.assert(id, 400);

	const task = await taskService.getTaskById(id);
	ctx.assert(task, 404);
	ctx.assert(task.owner._id.toString() === userId, 401);

	ctx.body = await taskService.deleteTaskById(id);
	ctx.status = 200;
};

module.exports = { readMany, readOne, create, updateOne, deleteOne };
