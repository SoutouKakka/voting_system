const campaignModel = require('../../../models/campaigns');
const validateDateFormat = require('../../../helper/date_format_validator');
const { ERROR_KEYS, CustomError } = require('../../../helper/handle_error');

async function findMultiple(ctx) {
	const { query: { start_time: startTime, end_time: endTime } } = ctx;
	if ((startTime && !validateDateFormat(startTime)) || (endTime && !validateDateFormat(endTime))) {
		throw new CustomError(ERROR_KEYS.CAMPAIGN_TIME_INVALID);
	}
	const campaigns = await campaignModel.findByStartTimeEndTime(startTime, endTime);
	ctx.body = campaigns;
	ctx.status = 200;
}

module.exports = findMultiple;
