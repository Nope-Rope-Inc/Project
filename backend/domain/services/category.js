'use strict';

const { createCRUDService } = require('./crud');

const CategoryService = createCRUDService({
	model: require('../models/category'),
	fieldsToPopulate: ['owner']
});

module.exports = new CategoryService();
