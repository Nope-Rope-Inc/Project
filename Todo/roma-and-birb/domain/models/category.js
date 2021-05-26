const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	color: {
		type: String,
		required: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

const Category = mongoose.model('Category', schema);
module.exports = Category;
