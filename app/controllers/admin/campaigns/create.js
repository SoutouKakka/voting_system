const moment = require('moment');

const { ERROR_KEYS, CustomError } = require('../../../helper/handle_error');
const validateDate = require('../../../helper/date_format_validator');
const campaignModel = require('../../../models/campaigns');

async function create(ctx) {
	const { request: { body } } = ctx;
	const dateForamt = 'YYYY-MM-DD';
	const startTime = moment.utc(body.start_time, dateForamt);
	const endTime = moment.utc(body.end_time, dateForamt);
	if (!validateDate(body.start_time)
		|| !validateDate(body.end_time)
		|| !startTime.isSameOrBefore(endTime)) {
		// campaign time is not valid
		throw new CustomError(ERROR_KEYS.CAMPAIGN_TIME_INVALID);
	}
	const campaign = await campaignModel.create(body);
	ctx.body = campaign;
	ctx.status = 201;
}

module.exports = create;
