'use strict';

const categoryService = require('../../domain/services/category');
const taskService = require('../../domain/services/task');

const readMany = async (ctx) => {
	const { userId } = ctx.session;
	ctx.body = await categoryService.getMany({ owner: userId });
	ctx.status = 200;
};

const readOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;
	ctx.assert(id, 400);

	const category = await categoryService.getById(id);
	ctx.assert(category, 404);
	ctx.assert(category.owner._id.toString() === userId, 401);

	ctx.body = category;
	ctx.status = 200;
};

const create = async (ctx) => {
	const { userId } = ctx.session;

	ctx.body = await categoryService.create({
		...ctx.request.body,
		owner: userId
	});
	ctx.status = 201;
};

const updateOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;
	ctx.assert(id, 400);

	const category = await categoryService.getById(id);
	ctx.assert(category, 404);
	ctx.assert(category.owner._id.toString() === userId, 401);

	ctx.body = await categoryService.updateById(id, ctx.request.body);
	ctx.status = 200;
};

const deleteOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;
	ctx.assert(id, 400);

	await taskService.deleteMany({
		category: id
	});
	const category = await categoryService.getById(id);

	ctx.assert(category, 404);
	ctx.assert(category.owner._id.toString() === userId, 401);

	ctx.body = await categoryService.deleteById(id);
	ctx.status = 200;
};

module.exports = { readMany, readOne, create, updateOne, deleteOne };
