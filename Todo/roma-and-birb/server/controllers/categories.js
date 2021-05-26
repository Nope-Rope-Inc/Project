const categoryService = require('../../domain/services/category');

const readMany = async (ctx) => {
	const { userId } = ctx.session;
	ctx.body = await categoryService.getCategories({ owner: userId });
	ctx.status = 200;
};

const readOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;
	ctx.assert(id, 400);

	const category = await categoryService.getCategoryById(id);
	ctx.assert(category, 404);
	ctx.assert(category.owner._id === userId, 401);

	ctx.body = category;
	ctx.status = 200;
};

const create = async (ctx) => {
	const { userId } = ctx.session;

	ctx.body = await categoryService.createCategory({
		...ctx.request.body,
		owner: userId
	});
	ctx.status = 201;
};

const updateOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;
	ctx.assert(id, 400);

	const category = await categoryService.getCategoryById(id);
	ctx.assert(category, 404);
	ctx.assert(category.owner.userId === userId, 401);

	ctx.body = await categoryService.updateCategoryById(id, ctx.request.body);
	ctx.status = 200;
};

const deleteOne = async (ctx) => {
	const { id } = ctx.params;
	const { userId } = ctx.session;
	ctx.assert(id, 400);

	const category = await categoryService.getCategoryById(id);
	ctx.assert(category, 404);
	ctx.assert(category.owner.userId === userId, 401);

	ctx.body = await categoryService.deleteCategoryById(id);
	ctx.status = 200;
};

module.exports = { readMany, readOne, create, updateOne, deleteOne };
