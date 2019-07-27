const moment = require('moment');

const { ERROR_KEYS, appendErrorMessage } = require('../../helper/handle_error');
const campaignModel = require('../../models/campaigns');
const voteModel = require('../../models/votes');

async function getResult(ctx) {
	const { params: { id: campaignID } } = ctx;
	const campaign = await campaignModel.findByID(campaignID);
	if (!campaign) {
		// no campaign
		appendErrorMessage(ctx, ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		return;
	}
	const {
		_id, name, description, choices, start_time: startTime, end_time: endTime
	} = campaign;
	const timeFormat = 'MMM D, YYYY';
	const meta = {
		_id: _id.toString(),
		name,
		description,
		startTime: moment.utc(startTime).format(timeFormat),
		endTime: moment.utc(endTime).format(timeFormat),
		choices: []
	};
	for (let i = 0; i < choices.length; i++) {
		const choice = choices[i];
		const choiceID = choice._id.toString();
		const choiceName = choice.name.toString();
		const choiceCount = await voteModel.getCountByChoiceID(choiceID);
		meta.choices.push({ choiceID, choiceName, choiceCount });
	}
	ctx.render('campaigns/result', { campaign: meta });
	ctx.status = 200;
}

module.exports = getResult;
