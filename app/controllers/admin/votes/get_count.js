const { ERROR_KEYS, CustomError } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/campaigns');
const voteModel = require('../../../models/votes');

async function find(ctx) {
	const { query: { campaign_id: campaignID } } = ctx;
	const campaign = await campaignModel.findChoiceIDsByID(campaignID);
	if (!campaign) {
		// no campaign
		throw new CustomError(ERROR_KEYS.CAMPAIGN_NOT_FOUND);
	}
	const { choices } = campaign;
	const results = {};
	for (let i = 0; i < choices.length; i++) {
		const choiceID = choices[i]._id.toString();
		results[choiceID] = await voteModel.getCountByChoiceID(choiceID);
	}
	ctx.body = results;
	ctx.status = 200;
}

module.exports = find;
