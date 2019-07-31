const _ = require('lodash');
const moment = require('moment');
const validid = require('validid');

const { ERROR_KEYS, CustomError } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/campaigns');
const voteModel = require('../../../models/votes');

async function create(ctx) {
	const { request: { body } } = ctx;
	const { hkid, campaign_id: campaignID, choice_id: choiceID } = body;
	if (!validid.hkid(hkid)) {
		// hkid is not valid
		throw new CustomError(ERROR_KEYS.HKID_INVALID);
	}
	// remove all non-alphanumeric characters
	const tidyHkid = hkid.replace(/[^a-zA-Z0-9]/g, '');
	const campaign = await campaignModel.findByID(campaignID);
	// check if campaign exists
	if (!campaign) {
		throw new CustomError(ERROR_KEYS.CAMPAIGN_NOT_FOUND);
	}
	// check if campaign is expired
	const startTime = moment.utc(campaign.start_time);
	const endTime = moment.utc(campaign.end_time);
	const now = moment.utc();
	if (!now.isBetween(startTime, endTime)) {
		throw new CustomError(ERROR_KEYS.CAMPAIGN_EXPIRED);
	}
	const campaignChoiceIDs = _.map(campaign.choices, (choice) => {
		const id = choice._id.toString();
		return id;
	});
	// check if campaign choice is valid
	if (campaignChoiceIDs.indexOf(choiceID) === -1) {
		throw new CustomError(ERROR_KEYS.CHOICE_NOT_FOUND);
	}
	const hkidHash = voteModel.hash(tidyHkid);
	const existingVote = await voteModel.findByCampaignIDHkidHash(campaignID, hkidHash);
	if (existingVote) {
		// already voted
		throw new CustomError(ERROR_KEYS.ALREADY_VOTED);
	}
	const vote = await voteModel.create({
		hkid_hash: hkidHash,
		campaign_id: campaignID,
		choice_id: choiceID
	});
	ctx.body = vote;
	ctx.status = 201;
}

module.exports = create;
