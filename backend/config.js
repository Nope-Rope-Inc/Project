module.exports = {
	db: {
		url: 'mongodb://localhost:27017/roma-and-birb'
	},
	server: {
		port: 80,
		session: {
			key: 'roma-and-birb',
			secret: 'secret'
		}
	}
};
