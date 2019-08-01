const mongoose = require('mongoose');
const md5 = require('md5');

const voteSchema = require('./schema/votes');

const VoteModel = mongoose.model('Vote', voteSchema);

class Vote {
	static hash(string) {
		return md5(string);
	}

	static async create(body) {
		const vote = new VoteModel(body);
		await vote.save();
		return vote;
	}

	static async findByCampaignIDHkidHash(campaignID, hkidHash) {
		return VoteModel.findOne({
			campaign_id: campaignID,
			hkid_hash: hkidHash
		});
	}

	static async getCountByChoiceID(choiceID) {
		return VoteModel.countDocuments({
			choice_id: choiceID
		});
	}

	static async getCountByCampaignID(campaignID) {
		return VoteModel.countDocuments({
			campaign_id: campaignID
		});
	}
}

module.exports = Vote;
