const _ = require('lodash');

const campaignModel = require('../../../models/compaigns');
const voteModel = require('../../../models/votes');

async function find(ctx) {
	const { query: { campaign_id: campaignID } } = ctx;
	const campaign = await campaignModel.findChoiceIDsByID(campaignID);
	const { choices } = campaign;
	if (!campaign) {
		// no campaign
	}
	const results = {};
	for (let i = 0; i < choices.length; i++) {
		const choiceID = _.get(choices, [i, '_id']).toString();
		results[choiceID] = await voteModel.getCountByChoiceID(choiceID);
	}
	ctx.body = results;
	ctx.status = 200;
}

module.exports = find;
