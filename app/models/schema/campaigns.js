const mongoose = require('mongoose');

const choiceSchema = require('./choices');

const { Schema } = mongoose;

const campaignSchema = new Schema({
	name: {
		type: String,
		trim: true,
		unique: false,
		index: false,
		required: [true, 'Campaign name is required']
	},
	description: {
		type: String,
		trim: true,
		unique: false,
		index: false,
		required: false
	},
	image: {
		type: String,
		trim: true,
		unique: false,
		index: false,
		required: false
	},
	start_time: {
		type: Date,
		required: [true, 'Start time is required'],
	},
	end_time: {
		type: Date,
		required: [true, 'End time is required'],
	},
	choices: {
		type: [choiceSchema],
		unique: false,
		index: false,
		required: [true, 'Campaign choices is required'],
	},
	created_at: {
		type: Date,
		default: Date.now,
		required: [true, 'Created date is required']
	},
	updated_at: {
		type: Date,
		default: Date.now,
		required: [true, 'Updated date is required'],
	}
});

campaignSchema.index({ start_time: -1 });
campaignSchema.index({ end_time: -1 });

campaignSchema.pre('findOneAndUpdate', function (next) {
	this._update.updated_at = new Date();
	next();
});

campaignSchema.pre('update', function (next) {
	this._update.updated_at = new Date();
	next();
});

module.exports = campaignSchema;
