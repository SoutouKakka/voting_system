const _ = require('lodash');
const validid = require('validid');

const { ERROR_KEYS, appendErrorMessage } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/campaigns');
const voteModel = require('../../../models/votes');

async function create(ctx) {
	const { request: { body } } = ctx;
	const { hkid, campaign_id: campaignID, choice_id: choiceID } = body;
	if (!validid.hkid(hkid)) {
		// hkid is not valid
		appendErrorMessage(ctx, ERROR_KEYS.HKID_INVALID);
		return;
	}
	const campaign = await campaignModel.findChoiceIDsByID(campaignID);
	if (!campaign) {
		// no campaign
		appendErrorMessage(ctx, ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		return;
	}
	const campaignChoiceIDs = _.map(campaign.choices, (choice) => {
		return choice._id.toString();
	});
	if (campaignChoiceIDs.indexOf(choiceID) === -1) {
		// no such choice
		appendErrorMessage(ctx, ERROR_KEYS.CHOICE_NOT_FOUND);
		return;
	}
	const hkidHash = voteModel.hash(hkid);
	const existingVote = await voteModel.findByCampaignIDHkidHash(campaignID, hkidHash);
	if (existingVote) {
		// already voted
		appendErrorMessage(ctx, ERROR_KEYS.ALREADY_VOTED);
		return;
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
