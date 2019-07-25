const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteSchema = new Schema({
	hkid_hash: {
		type: String,
		trim: true,
		unique: false,
		index: false,
		required: [true, 'HKID hash is required']
	},
	campaign_id: {
		type: Schema.Types.ObjectId,
		unique: false,
		required: [true, 'Campaign ID is required']
	},
	choice_id: {
		type: Schema.Types.ObjectId,
		unique: false,
		required: [true, 'Choice ID is required']
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

voteSchema.index({ campaign_id: -1, hkid_hash: -1 });

voteSchema.pre('findOneAndUpdate', function (next) {
	this._update.updated_at = new Date();
	next();
});

voteSchema.pre('update', function (next) {
	this._update.updated_at = new Date();
	next();
});

module.exports = voteSchema;
