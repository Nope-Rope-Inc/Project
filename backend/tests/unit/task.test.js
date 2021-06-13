const DB = require('../../db');
const config = require('../../config');
const userService = require('../../domain/services/user');
const taskService = require('../../domain/services/task');
const categoryService = require('../../domain/services/category');
const TaskImportance = require('../../domain/enums/task-importance');

describe('Task service', () => {
	let user, category, task;
	beforeAll(async () => {
		await DB.init(config.db.url);

		user = await userService.create({
			name: 'birb',
			email: 'birb@gmail.com',
			password: 'birb'
		});

		category = await categoryService.create({
			name: 'Programming',
			color: '#ff0000',
			owner: user._id
		});
	});

	afterAll(async () => {
		await userService.deleteById(user._id);
		await categoryService.deleteById(category._id);
		await taskService.deleteById(task._id);

		await DB.disconnect();
	});

	test('Creates task', async () => {
		const doc = {
			name: 'Become Senior JS Developer',
			description: 'Tomorrow',
			importance: TaskImportance.HIGH,
			owner: user._id,
			category: category._id
		};

		task = await taskService.create(doc);
		expect(task).toMatchObject(doc);
	});

	test('Gets task by id', async () => {
		const result = await taskService.getById(task._id);
		expect(result).not.toBeNull();
	});

	test('Gets tasks by filter', async () => {
		const result = await taskService.getMany({ name: task.name });
		expect(result.length).toBeGreaterThanOrEqual(1);
	});

	test('Updates task by id', async () => {
		const update = { name: 'Updated name' };
		const result = await taskService.updateById(task._id, update);
		expect(result.name).toBe(update.name);
	});

	test('Deletes task by id', async () => {
		await taskService.deleteById(task._id);
		const result = await taskService.getById(task._id);
		expect(result).toBeNull();
	});

	test('Deletes tasks by filter', async () => {
		const filter = { owner: user._id };
		await taskService.deleteMany(filter);
		const result = await taskService.getMany(filter);
		expect(result).toHaveLength(0);
	});
});
