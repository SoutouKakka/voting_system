const moment = require('moment');

const { ERROR_KEYS, appendErrorMessage } = require('../../../helper/handle_error');
const campaignModel = require('../../../models/campaigns');

async function create(ctx) {
	const { request: { body } } = ctx;
	const startTime = moment.utc(body.start_time);
	const endTime = moment.utc(body.end_time);
	if (!startTime.isValid() || !endTime.isValid() || !startTime.isSameOrBefore(endTime)) {
		// campaign time is not valid
		appendErrorMessage(ctx, ERROR_KEYS.CAMPAIGN_TIME_INVALID);
		return;
	}
	const campaign = await campaignModel.create(body);
	ctx.body = campaign;
	ctx.status = 201;
}

module.exports = create;
