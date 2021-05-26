const argon = require('argon2');
const User = require('../models/user');

class UserService {
	async createUser(data) {
		const { password } = data;

		if (!password) {
			throw new Error('Password must be passed while creating user');
		}

		data.password = await argon.hash(password);

		return User.create(data);
	}

	async getUsers(filter = {}) {
		return User.find(filter);
	}

	async getUserById(id) {
		return User.findById(id);
	}

	async getUser(fields = {}) {
		return User.findOne(fields);
	}

	async updateUserById(id, data) {
		if (data.password) {
			data.password = await argon.hash(data.password);
		}
		return User.findByIdAndUpdate(id, data, { new: true });
	}

	async deleteUserById(id) {
		return User.findByIdAndDelete(id);
	}

	async validatePasswordByEmail({ email, password }) {
		const user = await this.getUser({ email });

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
