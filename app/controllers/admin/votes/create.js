const validid = require('validid');

const { ERROR_KEYS, appendErrorMessage } = require('../../../helper/handle_error');
const voteModel = require('../../../models/votes');

async function create(ctx) {
	const { request: { body } } = ctx;
	const { hkid, campaign_id: campaignID, choice_id: choiceID } = body;
	if (!validid.hkid(hkid)) {
		// hkid is not valid
		appendErrorMessage(ctx, ERROR_KEYS.HKID_INVALID);
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
