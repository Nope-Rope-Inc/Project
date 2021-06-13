const { createCRUDService } = require('./crud');

const TaskService = createCRUDService({
	model: require('../models/task'),
	fieldsToPopulate: ['owner', 'category']
});

module.exports = new TaskService();
