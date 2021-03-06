const { ERROR_KEYS, CustomError } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/campaigns');
const voteModel = require('../../../models/votes');

async function getResult(ctx) {
	const { params: { id: campaignID } } = ctx;
	const campaign = await campaignModel.findByID(campaignID);
	if (!campaign) {
		// no campaign
		throw new CustomError(ERROR_KEYS.CAMPAIGN_NOT_FOUND);
	}
	const {
		_id, name, description, image, choices
	} = campaign;
	const results = {
		_id: _id.toString(),
		name,
		description,
		image,
		choices: []
	};
	for (let i = 0; i < choices.length; i++) {
		const choice = choices[i];
		const choiceID = choice._id.toString();
		const choiceName = choice.name;
		const choiceImage = choice.image;
		const choiceCount = await voteModel.getCountByChoiceID(choiceID);
		results.choices.push({
			_id: choiceID,
			name: choiceName,
			image: choiceImage,
			count: choiceCount
		});
	}
	ctx.body = results;
	ctx.status = 200;
}

module.exports = getResult;
