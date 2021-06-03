module.exports = {
	db: {
		url: 'mongodb+srv://Roma-and-Birb:Roma13228@cluster0.kkz9q.mongodb.net/TodoJS?retryWrites=true&w=majority'
	},
	server: {
		port: process.env.port,
		session: {
			key: 'roma-and-birb',
			secret: 'secret'
		}
	}
};
