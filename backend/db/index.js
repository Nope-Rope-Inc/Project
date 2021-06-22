'use strict';

const mongoose = require('mongoose');
const config = require('../config');

const DB = {
	async init(url = config.db.url) {
		mongoose.set('useNewUrlParser', true);
		mongoose.set('useFindAndModify', false);
		mongoose.set('useCreateIndex', true);
		mongoose.set('useUnifiedTopology', true);

		await mongoose.connect(url);
		console.log('=> [DB] База даних підключена')
	},
	async disconnect() {
		await mongoose.disconnect();
	}
};

module.exports = DB;
