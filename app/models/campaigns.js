const mongoose = require('mongoose');
const moment = require('moment');

const campaignSchema = require('./schema/campaigns');

const CampaignModel = mongoose.model('Campaign', campaignSchema);

class Campaign {
	static async create(campaignDocument) {
		this.campaign = new CampaignModel(campaignDocument);
		await this.campaign.save();
		return this.campaign;
	}

	static async findByID(CampaignID) {
		return CampaignModel.findOne({
			_id: CampaignID
		});
	}

	static async findChoiceIDsByID(CampaignID) {
		return CampaignModel.findOne({
			_id: CampaignID
		}, { 'choices._id': 1 }).lean();
	}

	static async findByStartTimeEndTime(startTime, endTime) {
		const query = {};
		if (startTime) {
			query.start_time = {
				$gte: moment.utc(startTime, 'YYYY-MM-DD')
			};
		}
		if (endTime) {
			query.end_time = {
				$lte: moment.utc(endTime, 'YYYY-MM-DD')
			};
		}
		return CampaignModel.find(query).sort({ end_time: -1, start_time: -1 });
	}

	static async updateByID(CampaignID, updateDocument) {
		await CampaignModel.findOneAndUpdate({
			_id: CampaignID
		}, updateDocument);
		return CampaignModel.find({
			_id: CampaignID
		});
	}

	static async removeByID(CampaignID) {
		return CampaignModel.findOneAndRemove({
			_id: CampaignID
		});
	}
}

module.exports = Campaign;
