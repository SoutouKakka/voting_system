const { ERROR_KEYS, appendErrorMessage } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/campaigns');
const voteModel = require('../../../models/votes');

async function getResult(ctx) {
	const { params: { id: campaignID } } = ctx;
	const campaign = await campaignModel.findByID(campaignID);
	if (!campaign) {
		// no campaign
		appendErrorMessage(ctx, ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		return;
	}
	const {
		_id, name, description, choices
	} = campaign;
	const results = {
		_id: _id.toString(),
		name,
		description,
		choices: []
	};
	for (let i = 0; i < choices.length; i++) {
		const choice = choices[i];
		const choiceID = choice._id.toString();
		const choiceName = choice.name;
		const choiceImage = choice.image;
		const choiceCount = await voteModel.getCountByChoiceID(choiceID);
		results.choices.push({
			choiceID, choiceName, choiceImage, choiceCount
		});
	}
	ctx.body = results;
	ctx.status = 200;
}

module.exports = getResult;
