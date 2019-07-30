const moment = require('moment');

const { ERROR_KEYS, CustomError } = require('../../../helper/handle_error');
const validateDateFormat = require('../../../helper/date_format_validator');
const campaignModel = require('../../../models/campaigns');

async function create(ctx) {
	const { request: { body } } = ctx;
	const dateForamt = 'YYYY-MM-DD';
	const now = moment.utc();
	const startTime = moment.utc(body.start_time, dateForamt);
	const endTime = moment.utc(body.end_time, dateForamt);
	if (!validateDateFormat(body.start_time)
		|| !validateDateFormat(body.end_time)
		|| startTime.isAfter(endTime)
		|| endTime.isBefore(now)) {
		// campaign time is not valid
		throw new CustomError(ERROR_KEYS.CAMPAIGN_TIME_INVALID);
	}
	const campaign = await campaignModel.create(body);
	ctx.body = campaign;
	ctx.status = 201;
}

module.exports = create;
