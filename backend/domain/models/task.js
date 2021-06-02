const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	importance: {
		type: Number,
		required: true
	},
	completed: {
		type: Boolean,
		required: true,
		default: () => false
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	}
});

const Task = mongoose.model('Task', schema);
module.exports = Task;
