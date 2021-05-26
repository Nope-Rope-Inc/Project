const mongoose = require('mongoose');
const config = require('../config');

const DB = {
	async init() {
		mongoose.set('useNewUrlParser', true);
		mongoose.set('useFindAndModify', false);
		mongoose.set('useCreateIndex', true);
		mongoose.set('useUnifiedTopology', true);

		await mongoose.connect(config.db.url);
		console.log('=> [DB] База данных подключена')
	}
};

module.exports = DB;
