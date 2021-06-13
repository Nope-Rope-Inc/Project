const argon = require('argon2');
const { createCRUDService } = require('./crud');

const UserCRUDService = createCRUDService({
	model: require('../models/user')
});

class UserService extends UserCRUDService {
	async create(data) {
		const { password } = data;

		if (!password) {
			throw new Error('Password must be passed while creating user');
		}

		data.password = await argon.hash(password);

		return super.create(data);
	}

	async updateById(id, data) {
		if (data.password) {
			data.password = await argon.hash(data.password);
		}
		return super.updateById(id, data);
	}

	async validatePasswordByEmail({ email, password }) {
		const user = await this.getOne({ email });

		if (!user) {
			return { found: false };
		}

		return {
			found: true,
			valid: await argon.verify(user.password, password),
			userId: user._id
		};
	}
}

module.exports = new UserService();
