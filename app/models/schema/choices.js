const mongoose = require('mongoose');

const { Schema } = mongoose;

const choiceSchema = new Schema({
	name: {
		type: String,
		trim: true,
		unique: false,
		index: false,
		required: [true, 'Campaign choice name is required']
	},
	image: {
		type: String,
		trim: true,
		unique: false,
		index: false,
		required: false
	},
	created_at: {
		type: Date,
		// required: [true, 'Created date is required'],
		default: Date.now
	},
	updated_at: {
		type: Date,
		// required: [true, 'Updated date is required'],
		default: Date.now
	}
});

choiceSchema.pre('findOneAndUpdate', function (next) {
	this._update.updated_at = new Date();
	next();
});

choiceSchema.pre('update', function (next) {
	this._update.updated_at = new Date();
	next();
});

module.exports = choiceSchema;
