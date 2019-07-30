const _ = require('lodash');
const moment = require('moment');
const campaignModel = require('../../models/campaigns');
const validateDateFormat = require('../../helper/date_format_validator');


async function findMultiple(ctx) {
	let { query: { start_time: startTime, end_time: endTime } } = ctx;
	if (!validateDateFormat(startTime)) {
		startTime = '';
	}
	if (!validateDateFormat(endTime)) {
		endTime = '';
	}
	const searchResults = await campaignModel.findByStartTimeEndTime(startTime, endTime);
	// prettify campaigns array
	const campaigns = _.map(searchResults, (searchResult) => {
		const timeFormat = 'MMM D, YYYY';
		const startTimeMoment = moment.utc(searchResult.start_time);
		const endTimeMoment = moment.utc(searchResult.end_time);
		const now = moment.utc();
		const active = now.isSameOrBefore(endTimeMoment);
		return {
			id: searchResult._id.toString(),
			name: searchResult.name,
			startTime: startTimeMoment.format(timeFormat),
			endTime: endTimeMoment.format(timeFormat),
			active
		};
	});
	ctx.render('campaigns/home', { campaigns });
	ctx.status = 200;
}

module.exports = findMultiple;
