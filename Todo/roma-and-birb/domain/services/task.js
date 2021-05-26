const Task = require('../models/task');
const { populateFields } = require('../../utils/helpers');

class TaskService {
	async createTask(data) {
		return Task.create(data);
	}

	async getTasks(filter = {}) {
		return this._populateFields(
			Task.find(filter)
		);
	}

	async getTaskById(id) {
		return this._populateFields(
			Task.findById(id)
		);
	}

	async updateTaskById(id, data) {
		return this._populateFields(
			Task.findByIdAndUpdate(id, data, { new: true })
		);
	}

	async deleteTaskById(id) {
		return this._populateFields(
			Task.findByIdAndDelete(id)
		);
	}

	_populateFields(document, fields = ['owner', 'category']) {
		return populateFields.apply(null, [document, fields]);
	}
}

module.exports = new TaskService();
