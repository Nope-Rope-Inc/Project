'use strict';

module.exports = {
	db: {
		url: '<DB-URL>'
	},
	server: {
		port: process.env.PORT || '<PORT>',
		session: {
			key: '<KEY>',
			secret: '<SECRET>'
		}
	}
};
