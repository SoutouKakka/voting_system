const _ = require('lodash');
const moment = require('moment');

const { ERROR_KEYS, appendErrorMessage } = require('../../helper/handle_error');
const campaignModel = require('../../models/campaigns');

async function find(ctx) {
	const { params: { id: campaignID } } = ctx;
	const campaign = await campaignModel.findByID(campaignID);
	if (!campaign) {
		// no campaign
		appendErrorMessage(ctx, ERROR_KEYS.CAMPAIGN_NOT_FOUND);
		return;
	}
	// form campaign meta to pug
	const {
		_id, name, description, image, startTime, end_time: endTime, choices
	} = campaign;
	const timeFormat = 'MMM D, YYYY';
	const meta = {
		id: _id,
		name,
		description,
		image,
		choices: [],
		startTime: moment.utc(startTime).format(timeFormat),
		endTime: moment.utc(endTime).format(timeFormat)
	};
	meta.choices = _.map(campaign.choices, (choice) => {
		const output = {
			id: choice._id,
			name: choice.name,
			image: choice.image
		};
		return output;
	});
	ctx.render('campaigns/vote', { campaign: meta });
	ctx.status = 200;
}

module.exports = find;
