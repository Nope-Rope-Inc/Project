const Category = require('../models/category');
const { populateFields } = require('../../utils/helpers');

class CategoryService {
	async createCategory(data) {
		return Category.create(data);
	}

	async getCategories(filter = {}) {
		return this._populateFields(
			Category.find(filter)
		);
	}

	async getCategoryById(id) {
		return this._populateFields(
			Category.findById(id)
		);
	}

	async updateCategoryById(id, data) {
		return this._populateFields(
			Category.findByIdAndUpdate(id, data, { new: true })
		);
	}

	async deleteCategoryById(id) {
		return this._populateFields(
			Category.findByIdAndDelete(id)
		);
	}

	_populateFields(document, fields = ['owner']) {
		return populateFields.apply(null, [document, fields]);
	}
}

module.exports = new CategoryService();
