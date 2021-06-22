'use strict';

const createCRUDService = ({ model, fieldsToPopulate = [] }) => {
	return class {
		#populateFields(document, fields = fieldsToPopulate) {
			return document.populate(
				fields.map(field => ({ path: field }))
			);
		}

		async create(data) {
			return model.create(data);
		}

		async getOne(filter = {}) {
			return this.#populateFields(
				model.findOne(filter)
			);
		}

		async getMany(filter = {}) {
			return this.#populateFields(
				model.find(filter)
			);
		}

		async getById(id) {
			return this.#populateFields(
				model.findById(id)
			);
		}

		async updateById(id, data) {
			return this.#populateFields(
				model.findByIdAndUpdate(id, data, { new: true })
			);
		}

		async deleteMany(filter = {}) {
			return this.#populateFields(
				model.deleteMany(filter)
			);
		}

		async deleteById(id) {
			return this.#populateFields(
				model.findByIdAndDelete(id)
			);
		}
	};
};

module.exports = { createCRUDService };
